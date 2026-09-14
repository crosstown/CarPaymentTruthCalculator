"use client";

import { useMemo, useState } from "react";
import {
  COMPARISON_TERMS_MONTHS,
  MAX_CUSTOM_TERM_MONTHS,
  calculateCarLoan,
  calculateTermComparison,
} from "@/lib/carLoan/calculate";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const parseAmount = (raw: string): number => {
  const n = parseFloat(raw);
  return Number.isNaN(n) || n < 0 ? 0 : n;
};

export default function Calculator() {
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeInValue, setTradeInValue] = useState("0");
  const [aprPercent, setAprPercent] = useState("7.5");
  const [termMonths, setTermMonths] = useState(60);
  // Separate raw text for the custom-term field so a user can type "9" on
  // the way to "96" without it snapping back to a preset mid-keystroke --
  // termMonths itself only updates once the typed value actually parses.
  const [customTermRaw, setCustomTermRaw] = useState("");
  const [salesTaxPercent, setSalesTaxPercent] = useState("7");
  const [fees, setFees] = useState("500");
  const [rollTaxAndFeesIntoLoan, setRollTaxAndFeesIntoLoan] = useState(true);
  const [monthlyInsuranceEstimate, setMonthlyInsuranceEstimate] = useState("");

  const input = useMemo(
    () => ({
      vehiclePrice: parseAmount(vehiclePrice),
      downPayment: parseAmount(downPayment),
      tradeInValue: parseAmount(tradeInValue),
      aprPercent: parseAmount(aprPercent),
      termMonths,
      salesTaxPercent: parseAmount(salesTaxPercent),
      fees: parseAmount(fees),
      rollTaxAndFeesIntoLoan,
      monthlyInsuranceEstimate: parseAmount(monthlyInsuranceEstimate),
    }),
    [
      vehiclePrice,
      downPayment,
      tradeInValue,
      aprPercent,
      termMonths,
      salesTaxPercent,
      fees,
      rollTaxAndFeesIntoLoan,
      monthlyInsuranceEstimate,
    ],
  );

  const isPresetTerm = (COMPARISON_TERMS_MONTHS as readonly number[]).includes(termMonths);

  // The comparison table always shows the standard terms, plus the current
  // term if it's a custom (non-preset) value, sorted into place -- so a
  // custom 42-month term shows up right between 36 and 48, not bolted on
  // at the end or missing entirely.
  const comparisonTerms = useMemo(() => {
    const terms = new Set<number>(COMPARISON_TERMS_MONTHS);
    terms.add(termMonths);
    return Array.from(terms).sort((a, b) => a - b);
  }, [termMonths]);

  const result = useMemo(() => calculateCarLoan(input), [input]);
  const comparison = useMemo(
    () => calculateTermComparison(input, comparisonTerms),
    [input, comparisonTerms],
  );

  function selectPresetTerm(months: number) {
    setTermMonths(months);
    setCustomTermRaw("");
  }

  function handleCustomTermChange(raw: string) {
    setCustomTermRaw(raw);
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n) && n > 0) {
      setTermMonths(Math.min(n, MAX_CUSTOM_TERM_MONTHS));
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Car Payment Truth Calculator
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        The monthly payment isn&apos;t the price of the car. See the real
        total -- interest, fees, and what a longer loan term actually costs.
      </p>

      <div className="mt-8 space-y-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="vehicle-price" className="block text-sm font-medium">
              Vehicle price
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <span className="text-neutral-400">$</span>
              <input
                id="vehicle-price"
                type="number"
                min="0"
                step="100"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
                className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="down-payment" className="block text-sm font-medium">
              Down payment
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <span className="text-neutral-400">$</span>
              <input
                id="down-payment"
                type="number"
                min="0"
                step="100"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="trade-in" className="block text-sm font-medium">
              Trade-in value
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <span className="text-neutral-400">$</span>
              <input
                id="trade-in"
                type="number"
                min="0"
                step="100"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(e.target.value)}
                className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="apr" className="block text-sm font-medium">
              Interest rate (APR)
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <input
                id="apr"
                type="number"
                min="0"
                step="0.1"
                value={aprPercent}
                onChange={(e) => setAprPercent(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
              <span className="text-neutral-400">%</span>
            </div>
          </div>
          <div>
            <label htmlFor="sales-tax" className="block text-sm font-medium">
              Sales tax rate
              <span className="block text-xs font-normal text-neutral-500">
                your combined state + local rate
              </span>
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <input
                id="sales-tax"
                type="number"
                min="0"
                step="0.1"
                value={salesTaxPercent}
                onChange={(e) => setSalesTaxPercent(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
              <span className="text-neutral-400">%</span>
            </div>
          </div>
          <div>
            <label htmlFor="fees" className="block text-sm font-medium">
              Fees
              <span className="block text-xs font-normal text-neutral-500">
                doc, registration, dealer fees
              </span>
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <span className="text-neutral-400">$</span>
              <input
                id="fees"
                type="number"
                min="0"
                step="10"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Loan term</label>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {COMPARISON_TERMS_MONTHS.map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => selectPresetTerm(months)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  termMonths === months
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                    : "border-neutral-300 dark:border-neutral-700"
                }`}
              >
                {months} mo
              </button>
            ))}
            <div
              className={`flex items-center rounded-md border px-2 ${
                !isPresetTerm
                  ? "border-neutral-900 dark:border-neutral-100"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              <input
                id="custom-term"
                type="number"
                min="1"
                max={MAX_CUSTOM_TERM_MONTHS}
                placeholder="Custom"
                value={!isPresetTerm ? termMonths : customTermRaw}
                onChange={(e) => handleCustomTermChange(e.target.value)}
                className="w-16 bg-transparent py-2 text-center text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-neutral-400">mo</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Any term from 1 to {MAX_CUSTOM_TERM_MONTHS} months -- not every
            lender offers every length, but the math works the same way.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rollTaxAndFeesIntoLoan}
            onChange={(e) => setRollTaxAndFeesIntoLoan(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700"
          />
          Roll tax &amp; fees into the loan
          <span className="text-neutral-500">(unchecked = pay them at signing)</span>
        </label>

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium">
            Monthly insurance estimate
            <span className="block text-xs font-normal text-neutral-500">
              optional -- enter your own quote for an accurate total.
              Insurance varies by state, driver, vehicle, coverage level,
              credit profile, and insurer, so there&apos;s no honest
              one-size-fits-all estimate to prefill here.
            </span>
          </label>
          <div className="mt-1 flex w-40 items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
            <span className="text-neutral-400">$</span>
            <input
              id="insurance"
              type="number"
              min="0"
              step="10"
              placeholder="0.00"
              value={monthlyInsuranceEstimate}
              onChange={(e) => setMonthlyInsuranceEstimate(e.target.value)}
              className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-neutral-200 pt-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <span>Amount financed</span>
          <span className="text-right">{currency.format(result.amountFinanced)}</span>
          <span>Due at signing</span>
          <span className="text-right">{currency.format(result.dueAtSigning)}</span>
          <span>Total interest</span>
          <span className="text-right">{currency.format(result.totalInterest)}</span>
          {result.totalInsuranceOverTerm > 0 && (
            <>
              <span>Insurance over {termMonths} mo</span>
              <span className="text-right">{currency.format(result.totalInsuranceOverTerm)}</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="text-xs text-neutral-500">Monthly payment</p>
            <p className="text-2xl font-semibold tracking-tight">
              {currency.format(result.monthlyPayment)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="text-xs text-neutral-500">True total cost</p>
            <p className="text-2xl font-semibold tracking-tight">
              {currency.format(result.trueTotalCost)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">
          Same car, different term
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          A lower monthly payment from a longer loan almost always means
          paying more overall. Here&apos;s this exact loan at every common
          term length{!isPresetTerm ? ", plus your custom term" : ""}.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-xs text-neutral-500 dark:border-neutral-800">
                <th className="px-4 py-2 font-medium">Term</th>
                <th className="px-4 py-2 font-medium">Monthly</th>
                <th className="px-4 py-2 font-medium">Total interest</th>
                <th className="px-4 py-2 font-medium">True total cost</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.termMonths}
                  className={`border-b border-neutral-100 last:border-0 dark:border-neutral-900 ${
                    row.termMonths === termMonths
                      ? "bg-neutral-100 dark:bg-neutral-900"
                      : ""
                  }`}
                >
                  <td className="px-4 py-2 font-medium">{row.termMonths} mo</td>
                  <td className="px-4 py-2">{currency.format(row.monthlyPayment)}</td>
                  <td className="px-4 py-2">{currencyWhole.format(row.totalInterest)}</td>
                  <td className="px-4 py-2">{currencyWhole.format(row.trueTotalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ul className="mt-6 list-inside list-disc space-y-1 text-xs text-neutral-500">
        <li>
          Sales tax assumes the common case where trade-in value reduces the
          taxable amount -- a few states (notably California) tax the full
          vehicle price regardless of trade-in, so this may overstate tax
          there.
        </li>
        <li>
          Monthly payment uses standard fixed-rate amortization on the
          amount financed; it doesn&apos;t model a variable-rate loan,
          balloon payment, or lease.
        </li>
        <li>
          The insurance estimate is only ever what you enter -- there&apos;s
          no way to generate a personalized quote from these inputs alone.
        </li>
        <li>This is an estimate for general informational purposes, not financial advice.</li>
      </ul>
    </div>
  );
}
