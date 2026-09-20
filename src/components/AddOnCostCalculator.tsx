"use client";

import { useMemo, useState } from "react";
import { calculateAddOnCost } from "@/lib/carLoan/addOnCost";
import type { Locale } from "./Calculator";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const DEFAULTS = {
  baseAmountFinanced: 30000,
  addOnPrice: 2500,
  aprPercent: 7.5,
  termMonths: 60,
};

const STRINGS = {
  en: {
    baseAmount: "Vehicle loan amount (without add-on)",
    addOnPrice: "Add-on price",
    apr: "APR",
    term: "Loan term",
    presets: [
      { label: "Extended warranty", price: 2500 },
      { label: "GAP coverage", price: 800 },
      { label: "Paint protection", price: 900 },
      { label: "Tire & wheel package", price: 1200 },
    ],
    withoutAddOn: "Without add-on",
    withAddOn: "With add-on rolled in",
    perMo: "/mo",
    totalInterest: "Total interest:",
    trueCost: "True cost of the add-on, financed",
    moSuffix: "mo",
    breakdown: (price: string, interest: string, monthly: string) =>
      `${price} sticker price + ${interest} interest from rolling it into the loan (+${monthly}/mo)`,
  },
  es: {
    baseAmount: "Monto del préstamo del vehículo (sin complemento)",
    addOnPrice: "Precio del complemento",
    apr: "APR",
    term: "Plazo del préstamo",
    presets: [
      { label: "Garantía extendida", price: 2500 },
      { label: "Cobertura GAP", price: 800 },
      { label: "Protección de pintura", price: 900 },
      { label: "Paquete de llantas y rines", price: 1200 },
    ],
    withoutAddOn: "Sin complemento",
    withAddOn: "Con complemento incluido",
    perMo: "/mes",
    totalInterest: "Interés total:",
    trueCost: "Costo real del complemento, financiado",
    moSuffix: "meses",
    breakdown: (price: string, interest: string, monthly: string) =>
      `${price} precio de lista + ${interest} de interés por incluirlo en el préstamo (+${monthly}/mes)`,
  },
} as const;

export default function AddOnCostCalculator({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
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
        {field(t.baseAmount, baseAmountFinanced, setBaseAmountFinanced, "$")}
        {field(t.addOnPrice, addOnPrice, setAddOnPrice, "$")}
        {field(t.apr, aprPercent, setAprPercent, undefined, "%")}
        {field(t.term, termMonths, setTermMonths, undefined, t.moSuffix)}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {t.presets.map((p) => (
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
          <p className="text-sm font-medium text-neutral-500">{t.withoutAddOn}</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.baseMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">{t.perMo}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t.totalInterest} {fmtMoney(result.baseTotalInterest)}
          </p>
        </div>
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">{t.withAddOn}</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.monthlyPaymentWithAddOn)}<span className="text-sm font-normal text-neutral-500">{t.perMo}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t.totalInterest} {fmtMoney(result.totalInterestWithAddOn)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
        <p className="text-sm font-medium text-neutral-500">{t.trueCost}</p>
        <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          {fmtMoney(result.trueAddOnCost)}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          {t.breakdown(fmtMoney(addOnPrice), fmtMoney(result.interestOnAddOn), fmtMoney(result.monthlyIncrease))}
        </p>
      </div>
    </div>
  );
}
