import type { CarLoanInput, CarLoanResult, TermComparisonRow } from "./types";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Standard fixed-rate amortization: level monthly payment M on principal P
 * at monthly rate r over n months solves
 *   M = P * r(1+r)^n / ((1+r)^n - 1)
 * (the r=0 case, an interest-free/promo loan, is just P/n).
 */
function amortizedPayment(principal: number, monthlyRate: number, termMonths: number): number {
  if (principal <= 0) return 0;
  if (monthlyRate === 0) return principal / termMonths;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * (monthlyRate * factor)) / (factor - 1);
}

export function calculateCarLoan(input: CarLoanInput): CarLoanResult {
  const price = Math.max(0, input.vehiclePrice);
  const tradeIn = Math.max(0, input.tradeInValue);
  const tradeInPayoff = Math.max(0, input.tradeInPayoff);
  const down = Math.max(0, input.downPayment);
  const taxRate = Math.max(0, input.salesTaxPercent) / 100;
  const apr = Math.max(0, input.aprPercent) / 100;
  const termMonths = Math.max(1, Math.round(input.termMonths));
  const fees = Math.max(0, input.fees);
  const monthlyInsurance = Math.max(0, input.monthlyInsuranceEstimate);

  // Most states tax the price net of trade-in (a "trade-in tax credit");
  // a handful (e.g. California) don't. This tool assumes the common case
  // -- see the disclosure note rendered alongside this for the exception.
  const taxableAmount = round2(Math.max(0, price - tradeIn));
  const salesTax = round2(taxableAmount * taxRate);

  // Owing more on the trade-in than it's worth doesn't reduce what you
  // finance -- it increases it. That gap gets tacked onto the new loan
  // regardless of whether tax/fees are rolled in, because unlike tax and
  // fees there's no "pay it at signing instead" option most buyers have.
  const negativeEquity = round2(Math.max(0, tradeInPayoff - tradeIn));

  const priceAfterTradeAndDown = Math.max(0, round2(price - tradeIn - down));

  const amountFinanced = Math.max(
    0,
    round2(
      (input.rollTaxAndFeesIntoLoan
        ? priceAfterTradeAndDown + salesTax + fees
        : priceAfterTradeAndDown) + negativeEquity,
    ),
  );
  const dueAtSigning = input.rollTaxAndFeesIntoLoan
    ? round2(down)
    : round2(down + salesTax + fees);

  const monthlyPayment = round2(amortizedPayment(amountFinanced, apr / 12, termMonths));
  const totalOfPayments = round2(monthlyPayment * termMonths);
  const totalInterest = round2(Math.max(0, totalOfPayments - amountFinanced));
  const totalInsuranceOverTerm = round2(monthlyInsurance * termMonths);
  const trueTotalCost = round2(dueAtSigning + totalOfPayments + totalInsuranceOverTerm);

  return {
    taxableAmount,
    salesTax,
    negativeEquity,
    amountFinanced,
    dueAtSigning,
    monthlyPayment,
    totalOfPayments,
    totalInterest,
    totalInsuranceOverTerm,
    trueTotalCost,
  };
}

/** Common auto loan terms, for the side-by-side "same car, different term" comparison. */
export const COMPARISON_TERMS_MONTHS = [36, 48, 60, 72, 84] as const;

/** Sane ceiling for a custom term -- 10 years covers every real-world auto
 * loan (even unusually long ones go to 96mo) with headroom, while still
 * keeping the amortization math and comparison table from being asked to
 * render something nonsensical. */
export const MAX_CUSTOM_TERM_MONTHS = 120;

export function calculateTermComparison(
  input: CarLoanInput,
  terms: readonly number[] = COMPARISON_TERMS_MONTHS,
): TermComparisonRow[] {
  return terms.map((termMonths) => {
    const r = calculateCarLoan({ ...input, termMonths });
    return {
      termMonths,
      monthlyPayment: r.monthlyPayment,
      totalInterest: r.totalInterest,
      totalOfPayments: r.totalOfPayments,
      trueTotalCost: r.trueTotalCost,
    };
  });
}

/**
 * Simulates paying down a fixed-rate loan one month at a time at a given
 * payment amount, so we can answer "what if you paid more than the required
 * payment?" -- a question the closed-form amortization formula can't answer
 * directly, since it assumes the payment is whatever keeps the loan exactly
 * at term. Stops the moment the balance hits zero (paying off early), or at
 * maxMonths as a backstop against an infinite loop if payment doesn't even
 * cover the interest accruing each month.
 */
function simulatePayoff(
  principal: number,
  monthlyRate: number,
  payment: number,
  maxMonths: number,
): { months: number; totalInterest: number } {
  if (principal <= 0) return { months: 0, totalInterest: 0 };
  if (payment <= 0) return { months: maxMonths, totalInterest: 0 };

  let balance = principal;
  let totalInterest = 0;
  let months = 0;

  while (balance > 0.005 && months < maxMonths) {
    const interestThisMonth = balance * monthlyRate;
    const principalPaid = Math.min(payment - interestThisMonth, balance);
    if (principalPaid <= 0) {
      // Payment doesn't even cover accruing interest -- balance never
      // shrinks. Bail out rather than loop until maxMonths for nothing.
      months = maxMonths;
      break;
    }
    balance -= principalPaid;
    totalInterest += interestThisMonth;
    months += 1;
  }

  return { months, totalInterest: round2(totalInterest) };
}

export interface ExtraPaymentImpact {
  /** Months to pay off the loan at the standard required payment, no extra. */
  baselineMonths: number;
  /** Months to pay off the loan once the extra monthly amount is added. */
  monthsToPayoff: number;
  /** baselineMonths - monthsToPayoff, i.e. how much sooner the car is paid off. */
  monthsSaved: number;
  /** Total interest paid over the life of the loan with the extra payment applied. */
  totalInterest: number;
  /** How much less interest is paid, vs. the standard payment schedule. */
  interestSaved: number;
}

/**
 * Models paying more than the required monthly payment: since a fixed-rate
 * loan is front-loaded with interest, extra dollars applied on top of the
 * required payment go straight to principal, shortening the loan and
 * cutting the interest that would have accrued on the balance that's now
 * gone sooner. Comparing a simulated payoff at the standard payment against
 * one at (payment + extra) turns that into concrete months and dollars.
 */
export function calculateExtraPaymentImpact(
  amountFinanced: number,
  aprPercent: number,
  termMonths: number,
  monthlyPayment: number,
  extraPerMonth: number,
): ExtraPaymentImpact {
  const monthlyRate = Math.max(0, aprPercent) / 100 / 12;
  // A generous backstop above the loan's own term -- paying extra can only
  // pay it off sooner, but the baseline run (extra=0) needs enough room to
  // reach its natural payoff even with rounding on the last payment.
  const maxMonths = termMonths + 2;

  const baseline = simulatePayoff(amountFinanced, monthlyRate, monthlyPayment, maxMonths);
  if (extraPerMonth <= 0) {
    return {
      baselineMonths: baseline.months,
      monthsToPayoff: baseline.months,
      monthsSaved: 0,
      totalInterest: baseline.totalInterest,
      interestSaved: 0,
    };
  }

  const withExtra = simulatePayoff(
    amountFinanced,
    monthlyRate,
    monthlyPayment + extraPerMonth,
    maxMonths,
  );

  return {
    baselineMonths: baseline.months,
    monthsToPayoff: withExtra.months,
    monthsSaved: Math.max(0, baseline.months - withExtra.months),
    totalInterest: withExtra.totalInterest,
    interestSaved: round2(Math.max(0, baseline.totalInterest - withExtra.totalInterest)),
  };
}
