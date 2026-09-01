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

  const priceAfterTradeAndDown = Math.max(0, round2(price - tradeIn - down));

  const amountFinanced = Math.max(
    0,
    input.rollTaxAndFeesIntoLoan
      ? round2(priceAfterTradeAndDown + salesTax + fees)
      : priceAfterTradeAndDown,
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

export function calculateTermComparison(input: CarLoanInput): TermComparisonRow[] {
  return COMPARISON_TERMS_MONTHS.map((termMonths) => {
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
