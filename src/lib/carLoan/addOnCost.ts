import { amortizedPayment } from "./calculate";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface AddOnCostInput {
  /** Amount financed for the vehicle itself, before any add-ons. */
  baseAmountFinanced: number;
  /** Price of the add-on (extended warranty, GAP, paint protection, etc.). */
  addOnPrice: number;
  aprPercent: number;
  termMonths: number;
}

export interface AddOnCostResult {
  /** Monthly payment without the add-on rolled in. */
  baseMonthlyPayment: number;
  /** Monthly payment with the add-on's price added to the financed amount. */
  monthlyPaymentWithAddOn: number;
  /** How much the add-on raises the monthly payment. */
  monthlyIncrease: number;
  /** Total interest paid on the loan without the add-on. */
  baseTotalInterest: number;
  /** Total interest paid on the loan with the add-on rolled in. */
  totalInterestWithAddOn: number;
  /**
   * Interest attributable to financing the add-on itself -- the real cost
   * of rolling it into the loan rather than paying cash, separate from the
   * add-on's sticker price.
   */
  interestOnAddOn: number;
  /** addOnPrice + interestOnAddOn -- what the add-on actually costs once financed. */
  trueAddOnCost: number;
}

/**
 * Rolling an add-on into a car loan means financing its price alongside
 * the vehicle at the vehicle loan's APR and term -- so the add-on doesn't
 * just cost its sticker price, it costs that price PLUS however much
 * interest accrues on it over the life of the loan. This isolates that by
 * running the same amortization twice (with and without the add-on's
 * price added to the financed amount) and taking the difference, rather
 * than trying to allocate a share of one blended payment to the add-on --
 * that allocation would be arbitrary, while comparing two real, complete
 * loans isn't.
 */
export function calculateAddOnCost(input: AddOnCostInput): AddOnCostResult {
  const baseAmountFinanced = Math.max(0, input.baseAmountFinanced);
  const addOnPrice = Math.max(0, input.addOnPrice);
  const monthlyRate = Math.max(0, input.aprPercent) / 100 / 12;
  const termMonths = Math.max(1, Math.round(input.termMonths));

  const baseMonthlyPayment = round2(amortizedPayment(baseAmountFinanced, monthlyRate, termMonths));
  const monthlyPaymentWithAddOn = round2(
    amortizedPayment(baseAmountFinanced + addOnPrice, monthlyRate, termMonths),
  );

  const baseTotalInterest = round2(Math.max(0, baseMonthlyPayment * termMonths - baseAmountFinanced));
  const totalInterestWithAddOn = round2(
    Math.max(0, monthlyPaymentWithAddOn * termMonths - (baseAmountFinanced + addOnPrice)),
  );

  const interestOnAddOn = round2(Math.max(0, totalInterestWithAddOn - baseTotalInterest));

  return {
    baseMonthlyPayment,
    monthlyPaymentWithAddOn,
    monthlyIncrease: round2(monthlyPaymentWithAddOn - baseMonthlyPayment),
    baseTotalInterest,
    totalInterestWithAddOn,
    interestOnAddOn,
    trueAddOnCost: round2(addOnPrice + interestOnAddOn),
  };
}
