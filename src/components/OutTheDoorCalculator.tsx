"use client";

import { useMemo, useState } from "react";
import { calculateOutTheDoorPrice } from "@/lib/carLoan/outTheDoorPrice";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const DEFAULTS = {
  vehiclePrice: 32000,
  tradeInValue: 0,
  rebate: 1000,
  salesTaxPercent: 7,
  docFee: 400,
  registrationFee: 200,
  otherFees: 100,
};

export default function OutTheDoorCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [tradeInValue, setTradeInValue] = useState(DEFAULTS.tradeInValue);
  const [rebate, setRebate] = useState(DEFAULTS.rebate);
  const [salesTaxPercent, setSalesTaxPercent] = useState(DEFAULTS.salesTaxPercent);
  const [docFee, setDocFee] = useState(DEFAULTS.docFee);
  const [registrationFee, setRegistrationFee] = useState(DEFAULTS.registrationFee);
  const [otherFees, setOtherFees] = useState(DEFAULTS.otherFees);

  const result = useMemo(
    () =>
      calculateOutTheDoorPrice({
        vehiclePrice,
        tradeInValue,
        rebate,
        salesTaxPercent,
        docFee,
        registrationFee,
        otherFees,
      }),
    [vehiclePrice, tradeInValue, rebate, salesTaxPercent, docFee, registrationFee, otherFees],
  );

  const field = (
    label: string,
    value: number,
    onChange: (v: number) => void,
    prefix?: string,
    suffix?: string,
    hint?: string,
  ) => (
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
      {hint && <span className="block text-xs font-normal text-neutral-400">{hint}</span>}
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
        {field("Vehicle price", vehiclePrice, setVehiclePrice, "$")}
        {field("Trade-in value", tradeInValue, setTradeInValue, "$")}
        {field("Rebate / incentive", rebate, setRebate, "$")}
        {field("Sales tax rate", salesTaxPercent, setSalesTaxPercent, undefined, "%", "your combined state + local rate")}
        {field("Doc fee", docFee, setDocFee, "$")}
        {field("Registration", registrationFee, setRegistrationFee, "$")}
        {field("Other fees", otherFees, setOtherFees, "$", undefined, "title, plate transfer, etc.")}
      </div>

      <div className="mt-6 space-y-1 border-t border-neutral-200 pt-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
        <div className="flex justify-between">
          <span>Taxable amount</span>
          <span>{fmtMoney(result.taxableAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sales tax</span>
          <span>{fmtMoney(result.salesTax)}</span>
        </div>
        <div className="flex justify-between">
          <span>Fees</span>
          <span>{fmtMoney(result.totalFees)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-900">
        <p className="text-sm font-medium text-neutral-500">Out-the-door price</p>
        <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          {fmtMoney(result.outTheDoorPrice)}
        </p>
      </div>
    </div>
  );
}
