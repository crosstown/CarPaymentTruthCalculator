"use client";

import { useMemo, useState } from "react";
import { calculateAddOnCost } from "@/lib/carLoan/addOnCost";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const DEFAULTS = {
  baseAmountFinanced: 30000,
  addOnPrice: 2500,
  aprPercent: 7.5,
  termMonths: 60,
};

const ADD_ON_PRESETS = [
  { label: "Extended warranty", price: 2500 },
  { label: "GAP coverage", price: 800 },
  { label: "Paint protection", price: 900 },
  { label: "Tire & wheel package", price: 1200 },
];

export default function AddOnCostCalculator() {
  const [baseAmountFinanced, setBaseAmountFinanced] = useState(DEFAULTS.baseAmountFinanced);
  const [addOnPrice, setAddOnPrice] = useState(DEFAULTS.addOnPrice);
  const [aprPercent, setAprPercent] = useState(DEFAULTS.aprPercent);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);

  const result = useMemo(
    () => calculateAddOnCost({ baseAmountFinanced, addOnPrice, aprPercent, termMonths }),
    [baseAmountFinanced, addOnPrice, aprPercent, termMonths],
  );

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {field("Vehicle loan amount (without add-on)", baseAmountFinanced, setBaseAmountFinanced, "$")}
        {field("Add-on price", addOnPrice, setAddOnPrice, "$")}
        {field("APR", aprPercent, setAprPercent, undefined, "%")}
        {field("Loan term", termMonths, setTermMonths, undefined, "mo")}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {ADD_ON_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setAddOnPrice(p.price)}
            className="rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            {p.label}: {fmtMoney(p.price)}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">Without add-on</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.baseMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Total interest: {fmtMoney(result.baseTotalInterest)}
          </p>
        </div>
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">With add-on rolled in</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.monthlyPaymentWithAddOn)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Total interest: {fmtMoney(result.totalInterestWithAddOn)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
        <p className="text-sm font-medium text-neutral-500">True cost of the add-on, financed</p>
        <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          {fmtMoney(result.trueAddOnCost)}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          {fmtMoney(addOnPrice)} sticker price + {fmtMoney(result.interestOnAddOn)} interest from
          rolling it into the loan (+{fmtMoney(result.monthlyIncrease)}/mo)
        </p>
      </div>
    </div>
  );
}
