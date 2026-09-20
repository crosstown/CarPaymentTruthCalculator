import { amortizedPayment } from "./calculate";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface RefinanceSavingsInput {
  /** Current remaining loan balance -- what you'd refinance. */
  currentBalance: number;
  currentAprPercent: number;
  /** Months left on the current loan if you kept it as-is. */
  currentRemainingTermMonths: number;
  newAprPercent: number;
  newTermMonths: number;
  /** Refinance/origination fees, paid at signing -- not rolled into the new loan, so a break-even point against them is meaningful. */
  refinanceFees: number;
}

export interface RefinanceSavingsResult {
  currentMonthlyPayment: number;
  /** Interest paid over the rest of the CURRENT loan if you don't refinance. */
  currentRemainingInterest: number;
  newMonthlyPayment: number;
  /** Interest paid over the full NEW loan. */
  newTotalInterest: number;
  /** currentMonthlyPayment - newMonthlyPayment. Negative means the new loan costs more per month. */
  monthlySavings: number;
  /** currentRemainingInterest - newTotalInterest. Negative means refinancing costs more in interest overall. */
  interestSaved: number;
  /**
   * Months of monthly savings needed to recoup the refinance fees.
   * null when there's no monthly savings to recoup them with (fees are a
   * pure loss in that case, not just "a very long break-even").
   */
  breakEvenMonths: number | null;
}

/**
 * Compares staying on a current loan's remaining schedule against
 * refinancing the same remaining balance into a new loan. The current
 * loan's remaining interest is computed the same way a fresh loan's total
 * interest is (payment * term - principal) -- valid here because
 * "currentBalance" and "currentRemainingTermMonths" already represent
 * where the loan stands today, not its original terms; there's no need to
 * reconstruct payment history to answer "what happens from here."
 */
export function calculateRefinanceSavings(input: RefinanceSavingsInput): RefinanceSavingsResult {
  const currentBalance = Math.max(0, input.currentBalance);
  const currentMonthlyRate = Math.max(0, input.currentAprPercent) / 100 / 12;
  const currentRemainingTermMonths = Math.max(1, Math.round(input.currentRemainingTermMonths));
  const newMonthlyRate = Math.max(0, input.newAprPercent) / 100 / 12;
  const newTermMonths = Math.max(1, Math.round(input.newTermMonths));
  const refinanceFees = Math.max(0, input.refinanceFees);

  const currentMonthlyPayment = round2(
    amortizedPayment(currentBalance, currentMonthlyRate, currentRemainingTermMonths),
  );
  const currentRemainingInterest = round2(
    Math.max(0, currentMonthlyPayment * currentRemainingTermMonths - currentBalance),
  );

  const newMonthlyPayment = round2(amortizedPayment(currentBalance, newMonthlyRate, newTermMonths));
  const newTotalInterest = round2(Math.max(0, newMonthlyPayment * newTermMonths - currentBalance));

  const monthlySavings = round2(currentMonthlyPayment - newMonthlyPayment);
  const interestSaved = round2(currentRemainingInterest - newTotalInterest);
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinanceFees / monthlySavings) : null;

  return {
    currentMonthlyPayment,
    currentRemainingInterest,
    newMonthlyPayment,
    newTotalInterest,
    monthlySavings,
    interestSaved,
    breakEvenMonths,
  };
}
