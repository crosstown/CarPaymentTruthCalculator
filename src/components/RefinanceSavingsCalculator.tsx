"use client";

import { useMemo, useState } from "react";
import { calculateRefinanceSavings } from "@/lib/carLoan/refinanceSavings";
import type { Locale } from "./Calculator";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const DEFAULTS = {
  currentBalance: 22000,
  currentAprPercent: 9.5,
  currentRemainingTermMonths: 48,
  newAprPercent: 6.5,
  newTermMonths: 48,
  refinanceFees: 200,
};

const STRINGS = {
  en: {
    currentLoan: "Current loan",
    remainingBalance: "Remaining balance",
    currentApr: "Current APR",
    monthsRemaining: "Months remaining",
    newLoanOffer: "New loan offer",
    newApr: "New APR",
    newTerm: "New term",
    refinanceFees: "Refinance fees",
    keepCurrent: "Keep current loan",
    refinance: "Refinance",
    perMo: "/mo",
    remainingInterest: "Remaining interest:",
    totalInterest: "Total interest:",
    youdSave: "You'd save",
    lessInterest: (amount: string) => `${amount} less total interest`,
    moreInterest: (amount: string) =>
      `${amount} more total interest despite the lower payment -- check the new term length`,
    breakEven: (fees: string, months: number) =>
      `Break-even on the ${fees} in fees: ${months} month${months === 1 ? "" : "s"}`,
    costsMore: "This offer would cost more",
    costsMoreDetail: (fees: string) =>
      `Refinancing at these terms raises your payment -- it isn't worth the ${fees} in fees unless the new term is much shorter and you specifically want to pay the loan off faster.`,
    moSuffix: "mo",
  },
  es: {
    currentLoan: "Préstamo actual",
    remainingBalance: "Saldo restante",
    currentApr: "APR actual",
    monthsRemaining: "Meses restantes",
    newLoanOffer: "Oferta de préstamo nuevo",
    newApr: "APR nuevo",
    newTerm: "Plazo nuevo",
    refinanceFees: "Cargos de refinanciamiento",
    keepCurrent: "Mantener préstamo actual",
    refinance: "Refinanciar",
    perMo: "/mes",
    remainingInterest: "Interés restante:",
    totalInterest: "Interés total:",
    youdSave: "Ahorrarías",
    lessInterest: (amount: string) => `${amount} menos en interés total`,
    moreInterest: (amount: string) =>
      `${amount} más en interés total a pesar del pago más bajo -- revisa el plazo nuevo`,
    breakEven: (fees: string, months: number) =>
      `Punto de equilibrio para los ${fees} en cargos: ${months} mes${months === 1 ? "" : "es"}`,
    costsMore: "Esta oferta costaría más",
    costsMoreDetail: (fees: string) =>
      `Refinanciar con estos términos sube tu pago -- no vale la pena los ${fees} en cargos a menos que el plazo nuevo sea mucho más corto y específicamente quieras terminar el préstamo más rápido.`,
    moSuffix: "meses",
  },
} as const;

export default function RefinanceSavingsCalculator({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
  const [currentBalance, setCurrentBalance] = useState(DEFAULTS.currentBalance);
  const [currentAprPercent, setCurrentAprPercent] = useState(DEFAULTS.currentAprPercent);
  const [currentRemainingTermMonths, setCurrentRemainingTermMonths] = useState(
    DEFAULTS.currentRemainingTermMonths,
  );
  const [newAprPercent, setNewAprPercent] = useState(DEFAULTS.newAprPercent);
  const [newTermMonths, setNewTermMonths] = useState(DEFAULTS.newTermMonths);
  const [refinanceFees, setRefinanceFees] = useState(DEFAULTS.refinanceFees);

  const result = useMemo(
    () =>
      calculateRefinanceSavings({
        currentBalance,
        currentAprPercent,
        currentRemainingTermMonths,
        newAprPercent,
        newTermMonths,
        refinanceFees,
      }),
    [currentBalance, currentAprPercent, currentRemainingTermMonths, newAprPercent, newTermMonths, refinanceFees],
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-950">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {t.currentLoan}
          </p>
          <div className="mt-2 space-y-3">
            {field(t.remainingBalance, currentBalance, setCurrentBalance, "$")}
            {field(t.currentApr, currentAprPercent, setCurrentAprPercent, undefined, "%")}
            {field(t.monthsRemaining, currentRemainingTermMonths, setCurrentRemainingTermMonths, undefined, t.moSuffix)}
          </div>
        </div>
        <div className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-950">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {t.newLoanOffer}
          </p>
          <div className="mt-2 space-y-3">
            {field(t.newApr, newAprPercent, setNewAprPercent, undefined, "%")}
            {field(t.newTerm, newTermMonths, setNewTermMonths, undefined, t.moSuffix)}
            {field(t.refinanceFees, refinanceFees, setRefinanceFees, "$")}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">{t.keepCurrent}</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.currentMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">{t.perMo}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t.remainingInterest} {fmtMoney(result.currentRemainingInterest)}
          </p>
        </div>
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">{t.refinance}</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.newMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">{t.perMo}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t.totalInterest} {fmtMoney(result.newTotalInterest)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
        {result.monthlySavings > 0 ? (
          <>
            <p className="text-sm font-medium text-neutral-500">{t.youdSave}</p>
            <p className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-500">
              {fmtMoney(result.monthlySavings)}{t.perMo}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {result.interestSaved > 0
                ? t.lessInterest(fmtMoney(result.interestSaved))
                : t.moreInterest(fmtMoney(Math.abs(result.interestSaved)))}
            </p>
            {result.breakEvenMonths !== null && (
              <p className="mt-1 text-sm text-neutral-500">
                {t.breakEven(fmtMoney(refinanceFees), result.breakEvenMonths)}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-neutral-500">{t.costsMore}</p>
            <p className="mt-1 text-2xl font-semibold text-red-600 dark:text-red-500">
              +{fmtMoney(Math.abs(result.monthlySavings))}{t.perMo}
            </p>
            <p className="mt-1 text-sm text-neutral-500">{t.costsMoreDetail(fmtMoney(refinanceFees))}</p>
          </>
        )}
      </div>
    </div>
  );
}
