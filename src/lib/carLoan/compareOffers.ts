import { amortizedPayment } from "./calculate";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface LoanOffer {
  label: string;
  aprPercent: number;
  termMonths: number;
  /** Fees for this specific offer, paid at signing -- not financed, so they don't affect the monthly payment, only the total cost comparison. */
  fees: number;
}

export interface LoanOfferResult extends LoanOffer {
  monthlyPayment: number;
  totalInterest: number;
  /** amountFinanced + totalInterest + fees. */
  totalCost: number;
}

/**
 * Compares 2-3 loan offers on the SAME financed amount (same car, same
 * amount borrowed) but different APR/term/fees -- the real-world scenario
 * of shopping a dealer offer against a credit union or bank pre-approval.
 * Each offer's fees are treated as paid at signing rather than financed,
 * since fee-rolling policy varies by lender and conflating it with the
 * term/APR comparison this tool exists for would muddy the one question
 * it answers: which offer actually costs less.
 */
export function compareLoanOffers(amountFinanced: number, offers: LoanOffer[]): LoanOfferResult[] {
  const principal = Math.max(0, amountFinanced);
  return offers.map((offer) => {
    const monthlyRate = Math.max(0, offer.aprPercent) / 100 / 12;
    const termMonths = Math.max(1, Math.round(offer.termMonths));
    const fees = Math.max(0, offer.fees);

    const monthlyPayment = round2(amortizedPayment(principal, monthlyRate, termMonths));
    const totalInterest = round2(Math.max(0, monthlyPayment * termMonths - principal));
    const totalCost = round2(principal + totalInterest + fees);

    return { ...offer, monthlyPayment, totalInterest, totalCost };
  });
}

/** Index of the offer with the lowest total cost -- ties go to the first (lowest-index) offer. */
export function cheapestOfferIndex(results: LoanOfferResult[]): number {
  if (results.length === 0) return -1;
  let best = 0;
  for (let i = 1; i < results.length; i++) {
    if (results[i].totalCost < results[best].totalCost) best = i;
  }
  return best;
}
