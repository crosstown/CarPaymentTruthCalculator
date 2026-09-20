const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface OutTheDoorInput {
  vehiclePrice: number;
  tradeInValue: number;
  /** Manufacturer or dealer rebate/incentive applied to the price. */
  rebate: number;
  salesTaxPercent: number;
  docFee: number;
  registrationFee: number;
  /** Any other flat fees not broken out above (title, plate transfer, etc.). */
  otherFees: number;
}

export interface OutTheDoorResult {
  taxableAmount: number;
  salesTax: number;
  totalFees: number;
  /** vehiclePrice - tradeInValue - rebate + salesTax + totalFees. */
  outTheDoorPrice: number;
}

/**
 * Out-the-door price: what actually changes hands, separate from how it's
 * financed (or whether it's financed at all). Trade-in reduces the taxable
 * amount in most states (same assumption as the loan calculator, same
 * California-style exception). Rebates are handled differently: most states
 * tax the PRE-rebate price, because a manufacturer rebate is treated as a
 * price reduction from the manufacturer to the dealer, not a discount the
 * buyer negotiated -- so it still counts toward the taxable sale price even
 * though it lowers what the buyer actually pays. (A handful of states do
 * exempt rebates from tax; this tool assumes the more common case.)
 */
export function calculateOutTheDoorPrice(input: OutTheDoorInput): OutTheDoorResult {
  const price = Math.max(0, input.vehiclePrice);
  const tradeIn = Math.max(0, input.tradeInValue);
  const rebate = Math.max(0, input.rebate);
  const taxRate = Math.max(0, input.salesTaxPercent) / 100;
  const docFee = Math.max(0, input.docFee);
  const registrationFee = Math.max(0, input.registrationFee);
  const otherFees = Math.max(0, input.otherFees);

  const taxableAmount = round2(Math.max(0, price - tradeIn));
  const salesTax = round2(taxableAmount * taxRate);
  const totalFees = round2(docFee + registrationFee + otherFees);
  const outTheDoorPrice = round2(Math.max(0, price - tradeIn - rebate + salesTax + totalFees));

  return { taxableAmount, salesTax, totalFees, outTheDoorPrice };
}
