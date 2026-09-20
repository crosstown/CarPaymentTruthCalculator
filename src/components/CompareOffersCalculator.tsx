"use client";

import { useMemo, useState } from "react";
import { compareLoanOffers, cheapestOfferIndex, type LoanOffer } from "@/lib/carLoan/compareOffers";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const DEFAULT_AMOUNT_FINANCED = 32000;

const DEFAULT_OFFERS: LoanOffer[] = [
  { label: "Dealer financing", aprPercent: 8.9, termMonths: 72, fees: 0 },
  { label: "Credit union", aprPercent: 6.4, termMonths: 60, fees: 0 },
  { label: "Bank pre-approval", aprPercent: 7.2, termMonths: 84, fees: 0 },
];

export default function CompareOffersCalculator() {
  const [amountFinanced, setAmountFinanced] = useState(DEFAULT_AMOUNT_FINANCED);
  const [offers, setOffers] = useState<LoanOffer[]>(DEFAULT_OFFERS);

  const results = useMemo(() => compareLoanOffers(amountFinanced, offers), [amountFinanced, offers]);
  const winnerIndex = useMemo(() => cheapestOfferIndex(results), [results]);

  const updateOffer = (i: number, patch: Partial<LoanOffer>) => {
    setOffers((prev) => prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));
  };

  return (
    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Amount to finance
        <span className="block text-xs font-normal text-neutral-400">
          same for every offer -- same car, same loan amount, different lenders
        </span>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-neutral-400">$</span>
          <input
            type="number"
            value={amountFinanced}
            onChange={(e) => setAmountFinanced(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
      </label>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {offers.map((offer, i) => (
          <div
            key={i}
            className={`rounded-md border p-3 ${
              i === winnerIndex
                ? "border-green-500 dark:border-green-600"
                : "border-neutral-200 dark:border-neutral-800"
            }`}
          >
            <input
              type="text"
              value={offer.label}
              onChange={(e) => updateOffer(i, { label: e.target.value })}
              className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            />

            <label className="mt-3 block text-xs font-medium text-neutral-500">
              APR
              <div className="mt-1 flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  value={offer.aprPercent}
                  onChange={(e) => updateOffer(i, { aprPercent: Number(e.target.value) || 0 })}
                  className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
                <span className="text-neutral-400">%</span>
              </div>
            </label>

            <label className="mt-2 block text-xs font-medium text-neutral-500">
              Term
              <div className="mt-1 flex items-center gap-1">
                <input
                  type="number"
                  value={offer.termMonths}
                  onChange={(e) => updateOffer(i, { termMonths: Number(e.target.value) || 0 })}
                  className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
                <span className="text-neutral-400">mo</span>
              </div>
            </label>

            <label className="mt-2 block text-xs font-medium text-neutral-500">
              Fees at signing
              <div className="mt-1 flex items-center gap-1">
                <span className="text-neutral-400">$</span>
                <input
                  type="number"
                  value={offer.fees}
                  onChange={(e) => updateOffer(i, { fees: Number(e.target.value) || 0 })}
                  className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </label>

            <div className="mt-3 border-t border-neutral-200 pt-2 text-sm dark:border-neutral-800">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                {fmtMoney(results[i]?.monthlyPayment ?? 0)}/mo
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Interest: {fmtMoney(results[i]?.totalInterest ?? 0)}
              </p>
              <p className="text-xs text-neutral-500">
                Total cost: {fmtMoney(results[i]?.totalCost ?? 0)}
              </p>
              {i === winnerIndex && (
                <p className="mt-1 text-xs font-medium text-green-600 dark:text-green-500">
                  Lowest total cost
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
