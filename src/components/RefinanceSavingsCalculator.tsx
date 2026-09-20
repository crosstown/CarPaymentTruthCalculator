"use client";

import { useMemo, useState } from "react";
import { calculateRefinanceSavings } from "@/lib/carLoan/refinanceSavings";

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

export default function RefinanceSavingsCalculator() {
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
            Current loan
          </p>
          <div className="mt-2 space-y-3">
            {field("Remaining balance", currentBalance, setCurrentBalance, "$")}
            {field("Current APR", currentAprPercent, setCurrentAprPercent, undefined, "%")}
            {field("Months remaining", currentRemainingTermMonths, setCurrentRemainingTermMonths, undefined, "mo")}
          </div>
        </div>
        <div className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-950">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            New loan offer
          </p>
          <div className="mt-2 space-y-3">
            {field("New APR", newAprPercent, setNewAprPercent, undefined, "%")}
            {field("New term", newTermMonths, setNewTermMonths, undefined, "mo")}
            {field("Refinance fees", refinanceFees, setRefinanceFees, "$")}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">Keep current loan</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.currentMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Remaining interest: {fmtMoney(result.currentRemainingInterest)}
          </p>
        </div>
        <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-500">Refinance</p>
          <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {fmtMoney(result.newMonthlyPayment)}<span className="text-sm font-normal text-neutral-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Total interest: {fmtMoney(result.newTotalInterest)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
        {result.monthlySavings > 0 ? (
          <>
            <p className="text-sm font-medium text-neutral-500">You&apos;d save</p>
            <p className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-500">
              {fmtMoney(result.monthlySavings)}/mo
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {result.interestSaved > 0
                ? `${fmtMoney(result.interestSaved)} less total interest`
                : `${fmtMoney(Math.abs(result.interestSaved))} more total interest despite the lower payment -- check the new term length`}
            </p>
            {result.breakEvenMonths !== null && (
              <p className="mt-1 text-sm text-neutral-500">
                Break-even on the {fmtMoney(refinanceFees)} in fees: {result.breakEvenMonths} month
                {result.breakEvenMonths === 1 ? "" : "s"}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-neutral-500">This offer would cost more</p>
            <p className="mt-1 text-2xl font-semibold text-red-600 dark:text-red-500">
              +{fmtMoney(Math.abs(result.monthlySavings))}/mo
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Refinancing at these terms raises your payment -- it isn&apos;t worth
              the {fmtMoney(refinanceFees)} in fees unless the new term is much
              shorter and you specifically want to pay the loan off faster.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
