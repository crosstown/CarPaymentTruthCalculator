"use client";

import { useMemo, useState } from "react";
import { calculateTermComparison, COMPARISON_TERMS_MONTHS } from "@/lib/carLoan/calculate";
import type { CarLoanInput } from "@/lib/carLoan/types";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const DEFAULTS = {
  vehiclePrice: 38000,
  downPayment: 3000,
  aprPercent: 7.5,
  salesTaxPercent: 7,
  fees: 500,
};

export default function SeventyTwoVsEightyFourCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [downPayment, setDownPayment] = useState(DEFAULTS.downPayment);
  const [aprPercent, setAprPercent] = useState(DEFAULTS.aprPercent);
  const [salesTaxPercent, setSalesTaxPercent] = useState(DEFAULTS.salesTaxPercent);
  const [fees, setFees] = useState(DEFAULTS.fees);

  const input: CarLoanInput = useMemo(
    () => ({
      vehiclePrice,
      downPayment,
      tradeInValue: 0,
      tradeInPayoff: 0,
      aprPercent,
      termMonths: 72,
      salesTaxPercent,
      fees,
      rollTaxAndFeesIntoLoan: true,
      monthlyInsuranceEstimate: 0,
    }),
    [vehiclePrice, downPayment, aprPercent, salesTaxPercent, fees],
  );

  const comparison = useMemo(() => calculateTermComparison(input, COMPARISON_TERMS_MONTHS), [input]);
  const seventyTwo = comparison.find((r) => r.termMonths === 72)!;
  const eightyFour = comparison.find((r) => r.termMonths === 84)!;

  const field = (
    label: string,
    value: number,
    onChange: (v: number) => void,
    prefix?: string,
    suffix?: string,
  ) => (
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
      <div className="mt-1 flex items-center gap-1">
        {prefix && <span className="text-neutral-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        {suffix && <span className="text-neutral-400">{suffix}</span>}
      </div>
    </label>
  );

  return (
    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {field("Vehicle price", vehiclePrice, setVehiclePrice, "$")}
        {field("Down payment", downPayment, setDownPayment, "$")}
        {field("APR", aprPercent, setAprPercent, undefined, "%")}
        {field("Sales tax rate", salesTaxPercent, setSalesTaxPercent, undefined, "%")}
        {field("Fees", fees, setFees, "$")}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">72 months</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(seventyTwo.monthlyPayment)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Total interest: {fmtMoney(seventyTwo.totalInterest)}
          </p>
          <p className="text-sm text-neutral-500">True total cost: {fmtMoney(seventyTwo.trueTotalCost)}</p>
        </div>
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">84 months</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(eightyFour.monthlyPayment)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Total interest: {fmtMoney(eightyFour.totalInterest)}
          </p>
          <p className="text-sm text-neutral-500">True total cost: {fmtMoney(eightyFour.trueTotalCost)}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Stretching this loan from 72 to 84 months lowers the payment by{" "}
        <strong className="text-neutral-800 dark:text-neutral-200">
          {fmtMoney(seventyTwo.monthlyPayment - eightyFour.monthlyPayment)}/mo
        </strong>{" "}
        but costs{" "}
        <strong className="text-neutral-800 dark:text-neutral-200">
          {fmtMoney(eightyFour.totalInterest - seventyTwo.totalInterest)}
        </strong>{" "}
        more in total interest over the life of the loan.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-neutral-500 dark:border-neutral-800">
              <th className="py-1 pr-4 font-medium">Term</th>
              <th className="py-1 pr-4 font-medium">Monthly</th>
              <th className="py-1 pr-4 font-medium">Total interest</th>
              <th className="py-1 font-medium">True total cost</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr
                key={row.termMonths}
                className={`border-b border-neutral-100 dark:border-neutral-900 ${
                  row.termMonths === 72 || row.termMonths === 84
                    ? "font-medium text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <td className="py-1.5 pr-4">{row.termMonths} mo</td>
                <td className="py-1.5 pr-4">{fmtMoney(row.monthlyPayment)}</td>
                <td className="py-1.5 pr-4">{fmtMoney(row.totalInterest)}</td>
                <td className="py-1.5">{fmtMoney(row.trueTotalCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
