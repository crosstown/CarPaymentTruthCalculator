export interface CarLoanInput {
  /** Sticker/negotiated price of the vehicle, before tax and fees. */
  vehiclePrice: number;
  downPayment: number;
  /** Value of a trade-in vehicle, if any. Reduces the amount financed and (in most states) the taxable amount. */
  tradeInValue: number;
  /** Annual percentage rate, e.g. 6.9 for 6.9%. */
  aprPercent: number;
  termMonths: number;
  /** Combined state + county + city sales tax rate, user-entered -- this varies too granularly (by ZIP code, and by trade-in-credit rules) to model as a lookup table the way income tax was. */
  salesTaxPercent: number;
  /** Lump sum for doc fee, registration, title, and other dealer fees. */
  fees: number;
  /** Most loans roll tax and fees into the financed amount by default; some buyers pay them in cash at signing instead. */
  rollTaxAndFeesIntoLoan: boolean;
  /** User's own monthly insurance estimate/quote -- there's no honest way to model this per-driver, so it's opt-in, not a computed default. */
  monthlyInsuranceEstimate: number;
}

export interface CarLoanResult {
  taxableAmount: number;
  salesTax: number;
  /** Principal actually financed by the loan. */
  amountFinanced: number;
  /** Cash due at signing -- the down payment, plus tax/fees if not rolled into the loan. */
  dueAtSigning: number;
  monthlyPayment: number;
  /** monthlyPayment * termMonths -- principal + interest (and tax/fees, if rolled into the loan). */
  totalOfPayments: number;
  totalInterest: number;
  totalInsuranceOverTerm: number;
  /** dueAtSigning + totalOfPayments + totalInsuranceOverTerm -- the actual cash cost of the car over the loan term, the number this tool exists to surface. */
  trueTotalCost: number;
}

export interface TermComparisonRow {
  termMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalOfPayments: number;
  trueTotalCost: number;
}
