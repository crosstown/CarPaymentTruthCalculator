"use client";

import { useMemo, useState } from "react";
import {
  COMPARISON_TERMS_MONTHS,
  MAX_CUSTOM_TERM_MONTHS,
  calculateAffordabilityComparison,
  calculateAffordablePrice,
  calculateCarLoan,
  calculateExtraPaymentImpact,
  calculateTermComparison,
} from "@/lib/carLoan/calculate";

type Mode = "price" | "budget";
export type Locale = "en" | "es";

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

const STRINGS = {
  en: {
    title: "Car Payment Truth Calculator",
    subtitle:
      "The monthly payment isn't the price of the car. See the real total -- interest, fees, and what a longer loan term actually costs.",
    modePrice: "I know the price",
    modeBudget: "I know my budget",
    modePriceHint: "Enter a price below to see the real monthly payment and total cost.",
    modeBudgetHint: "Enter what you can pay per month below to see the price of car that actually fits.",
    vehiclePrice: "Vehicle price",
    monthlyBudget: "Monthly budget",
    monthlyBudgetHint: "total you can pay per month",
    monthlyBudgetInsuranceSuffix: ", insurance included",
    downPayment: "Down payment",
    tradeIn: "Trade-in value",
    tradeInPayoff: "Still owed on trade-in",
    tradeInPayoffHint: "optional -- if it's not paid off yet",
    apr: "Interest rate (APR)",
    salesTax: "Sales tax rate",
    salesTaxHint: "your combined state + local rate",
    fees: "Fees",
    feesHint: "doc, registration, dealer fees",
    loanTerm: "Loan term",
    customTermPlaceholder: "Custom",
    moSuffix: "mo",
    termHint: (max: number) =>
      `Any term from 1 to ${max} months -- not every lender offers every length, but the math works the same way.`,
    rollTaxAndFees: "Roll tax & fees into the loan",
    rollTaxAndFeesHint: "(unchecked = pay them at signing)",
    insurance: "Monthly insurance estimate",
    insuranceHint:
      "optional -- enter your own quote for an accurate total. Insurance varies by state, driver, vehicle, coverage level, credit profile, and insurer, so there's no honest one-size-fits-all estimate to prefill here.",
    negativeEquityWarning: (owed: string, worth: string, gap: string) =>
      `You owe ${owed} on your trade-in but it's only worth ${worth}. That ${gap} of negative equity doesn't go away -- it's rolled into this loan, so you're financing it (plus interest on it) along with the new car.`,
    monthlyPayment: "Monthly payment",
    negativeEquityRolledIn: "Negative equity rolled in",
    amountFinanced: "Amount financed",
    dueAtSigning: "Due at signing",
    totalInterest: "Total interest",
    insuranceOver: (term: number) => `Insurance over ${term} mo`,
    vehiclePriceAfford: "Vehicle price you can afford",
    trueTotalCost: "True total cost",
    comparisonTitleBudget: "Same budget, different term",
    comparisonTitlePrice: "Same car, different term",
    comparisonSubtitleBudget:
      "A longer term doesn't just lower the payment on a given car -- it raises the price of car your budget can reach in the first place. Here's what this exact budget affords at every common term length.",
    comparisonSubtitlePrice: (customSuffix: string) =>
      `A lower monthly payment from a longer loan almost always means paying more overall. Here's this exact loan at every common term length${customSuffix}.`,
    comparisonSubtitleCustomSuffix: ", plus your custom term",
    term: "Term",
    priceAfford: "Price you can afford",
    monthly: "Monthly",
    payExtraTitle: "Pay extra, save interest",
    payExtraSubtitle:
      "Auto loans are front-loaded with interest -- early payments are mostly interest, later ones mostly principal. Extra dollars on top of the required payment skip straight to principal, so they cut interest you'd otherwise pay later on a balance that's now gone sooner.",
    extraPerMonth: "Extra per month",
    extraPaymentResult: (extra: string, months: number, newMonth: number, oldMonth: number, saved: string) =>
      `Paying an extra ${extra}/month pays this loan off ${months} months early (month ${newMonth} instead of ${oldMonth}) and saves ${saved} in interest.`,
    extraPaymentNoEffect:
      "That extra amount doesn't shorten the loan (it may exceed the remaining balance almost immediately, or the loan is already interest-free).",
    footnotes: [
      "\"I know my budget\" mode treats your monthly insurance estimate as part of that budget (if you've entered one), then finds the highest vehicle price whose loan payment still fits what's left.",
      "Sales tax assumes the common case where trade-in value reduces the taxable amount -- a few states (notably California) tax the full vehicle price regardless of trade-in, so this may overstate tax there.",
      "Negative equity from a trade-in loan is assumed to always be rolled into the new loan (the common case) rather than paid in cash at signing.",
      "The extra-payment payoff estimate assumes every extra dollar goes to principal each month, consistently, for the life of the loan -- real-world lenders and payment habits vary.",
      "Monthly payment uses standard fixed-rate amortization on the amount financed; it doesn't model a variable-rate loan, balloon payment, or lease.",
      "The insurance estimate is only ever what you enter -- there's no way to generate a personalized quote from these inputs alone.",
      "This is an estimate for general informational purposes, not financial advice.",
    ],
  },
  es: {
    title: "Calculadora de la Verdad del Pago del Auto",
    subtitle:
      "El pago mensual no es el precio del auto. Mira el costo real -- intereses, cargos, y lo que realmente cuesta un plazo de préstamo más largo.",
    modePrice: "Sé el precio",
    modeBudget: "Sé mi presupuesto",
    modePriceHint: "Ingresa un precio abajo para ver el pago mensual real y el costo total.",
    modeBudgetHint: "Ingresa cuánto puedes pagar al mes para ver el precio de auto que realmente te alcanza.",
    vehiclePrice: "Precio del vehículo",
    monthlyBudget: "Presupuesto mensual",
    monthlyBudgetHint: "total que puedes pagar al mes",
    monthlyBudgetInsuranceSuffix: ", seguro incluido",
    downPayment: "Enganche",
    tradeIn: "Valor del auto a cambio",
    tradeInPayoff: "Saldo pendiente del auto a cambio",
    tradeInPayoffHint: "opcional -- si aún no está pagado",
    apr: "Tasa de interés (APR)",
    salesTax: "Tasa de impuesto sobre venta",
    salesTaxHint: "tu tasa combinada estatal + local",
    fees: "Cargos",
    feesHint: "trámites, registro, cargos del concesionario",
    loanTerm: "Plazo del préstamo",
    customTermPlaceholder: "Personalizado",
    moSuffix: "meses",
    termHint: (max: number) =>
      `Cualquier plazo de 1 a ${max} meses -- no todos los prestamistas ofrecen todos los plazos, pero el cálculo funciona igual.`,
    rollTaxAndFees: "Incluir impuestos y cargos en el préstamo",
    rollTaxAndFeesHint: "(sin marcar = pagarlos al firmar)",
    insurance: "Estimado de seguro mensual",
    insuranceHint:
      "opcional -- ingresa tu propia cotización para un total preciso. El seguro varía según el estado, conductor, vehículo, nivel de cobertura, historial crediticio y aseguradora, así que no hay un estimado honesto que sirva para todos.",
    negativeEquityWarning: (owed: string, worth: string, gap: string) =>
      `Debes ${owed} en tu auto a cambio pero solo vale ${worth}. Esa diferencia de ${gap} en capital negativo no desaparece -- se incluye en este préstamo, así que la estás financiando (más los intereses) junto con el auto nuevo.`,
    monthlyPayment: "Pago mensual",
    negativeEquityRolledIn: "Capital negativo incluido",
    amountFinanced: "Monto financiado",
    dueAtSigning: "Total a pagar al firmar",
    totalInterest: "Interés total",
    insuranceOver: (term: number) => `Seguro durante ${term} meses`,
    vehiclePriceAfford: "Precio de vehículo que te alcanza",
    trueTotalCost: "Costo total real",
    comparisonTitleBudget: "Mismo presupuesto, diferente plazo",
    comparisonTitlePrice: "Mismo auto, diferente plazo",
    comparisonSubtitleBudget:
      "Un plazo más largo no solo baja el pago de un auto dado -- también sube el precio del auto que tu presupuesto puede alcanzar. Esto es lo que este presupuesto exacto alcanza en cada plazo común.",
    comparisonSubtitlePrice: (customSuffix: string) =>
      `Un pago mensual más bajo por un préstamo más largo casi siempre significa pagar más en total. Aquí está este préstamo exacto en cada plazo común${customSuffix}.`,
    comparisonSubtitleCustomSuffix: ", más tu plazo personalizado",
    term: "Plazo",
    priceAfford: "Precio que te alcanza",
    monthly: "Mensual",
    payExtraTitle: "Paga extra, ahorra intereses",
    payExtraSubtitle:
      "Los préstamos de auto cargan más intereses al principio -- los primeros pagos son mayormente interés, los últimos mayormente capital. Los dólares extra sobre el pago requerido van directo al capital, así que reducen el interés que pagarías después sobre un saldo que ya desapareció antes.",
    extraPerMonth: "Extra por mes",
    extraPaymentResult: (extra: string, months: number, newMonth: number, oldMonth: number, saved: string) =>
      `Pagar ${extra}/mes extra termina este préstamo ${months} meses antes (mes ${newMonth} en vez del mes ${oldMonth}) y ahorra ${saved} en intereses.`,
    extraPaymentNoEffect:
      "Ese monto extra no acorta el préstamo (puede exceder el saldo restante casi de inmediato, o el préstamo ya no genera intereses).",
    footnotes: [
      "El modo \"Sé mi presupuesto\" trata tu estimado de seguro mensual como parte de ese presupuesto (si ingresaste uno), y luego encuentra el precio de vehículo más alto cuyo pago de préstamo todavía cabe en lo que queda.",
      "El impuesto sobre venta asume el caso común donde el valor del auto a cambio reduce el monto gravable -- algunos estados (especialmente California) gravan el precio completo del vehículo sin importar el auto a cambio, así que esto podría sobreestimar el impuesto ahí.",
      "Se asume que el capital negativo de un auto a cambio siempre se incluye en el préstamo nuevo (el caso común) en vez de pagarse en efectivo al firmar.",
      "El estimado de pago extra asume que cada dólar extra va al capital cada mes, de forma constante, durante toda la vida del préstamo -- los prestamistas reales y los hábitos de pago varían.",
      "El pago mensual usa amortización estándar de tasa fija sobre el monto financiado; no modela un préstamo de tasa variable, pago global (\"balloon\"), ni arrendamiento.",
      "El estimado de seguro es únicamente lo que tú ingreses -- no hay forma de generar una cotización personalizada solo con estos datos.",
      "Esto es un estimado con fines informativos generales, no es asesoría financiera.",
    ],
  },
} as const;

export default function Calculator({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
  const [mode, setMode] = useState<Mode>("price");
  const [monthlyBudget, setMonthlyBudget] = useState("500");
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeInValue, setTradeInValue] = useState("0");
  const [tradeInPayoff, setTradeInPayoff] = useState("0");
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
  const [extraPerMonth, setExtraPerMonth] = useState("");

  const input = useMemo(
    () => ({
      vehiclePrice: parseAmount(vehiclePrice),
      downPayment: parseAmount(downPayment),
      tradeInValue: parseAmount(tradeInValue),
      tradeInPayoff: parseAmount(tradeInPayoff),
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
      tradeInPayoff,
      aprPercent,
      termMonths,
      salesTaxPercent,
      fees,
      rollTaxAndFeesIntoLoan,
      monthlyInsuranceEstimate,
    ],
  );

  const isPresetTerm = (COMPARISON_TERMS_MONTHS as readonly number[]).includes(termMonths);

  const comparisonTerms = useMemo(() => {
    const terms = new Set<number>(COMPARISON_TERMS_MONTHS);
    terms.add(termMonths);
    return Array.from(terms).sort((a, b) => a - b);
  }, [termMonths]);

  const affordability = useMemo(
    () => calculateAffordablePrice(parseAmount(monthlyBudget), input),
    [monthlyBudget, input],
  );
  const effectiveInput = useMemo(
    () => (mode === "budget" ? { ...input, vehiclePrice: affordability.vehiclePrice } : input),
    [mode, input, affordability.vehiclePrice],
  );

  const result = useMemo(() => calculateCarLoan(effectiveInput), [effectiveInput]);
  const comparison = useMemo(
    () => calculateTermComparison(effectiveInput, comparisonTerms),
    [effectiveInput, comparisonTerms],
  );
  const affordabilityComparison = useMemo(
    () => calculateAffordabilityComparison(parseAmount(monthlyBudget), input, comparisonTerms),
    [monthlyBudget, input, comparisonTerms],
  );
  const comparisonRows = useMemo(
    () =>
      mode === "budget"
        ? affordabilityComparison.map((row) => ({
            termMonths: row.termMonths,
            primary: currencyWhole.format(row.vehiclePrice),
            totalInterest: row.totalInterest,
            trueTotalCost: row.trueTotalCost,
          }))
        : comparison.map((row) => ({
            termMonths: row.termMonths,
            primary: currency.format(row.monthlyPayment),
            totalInterest: row.totalInterest,
            trueTotalCost: row.trueTotalCost,
          })),
    [mode, affordabilityComparison, comparison],
  );
  const extraPaymentImpact = useMemo(
    () =>
      calculateExtraPaymentImpact(
        result.amountFinanced,
        input.aprPercent,
        termMonths,
        result.monthlyPayment,
        parseAmount(extraPerMonth),
      ),
    [result.amountFinanced, input.aprPercent, termMonths, result.monthlyPayment, extraPerMonth],
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
      <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.subtitle}</p>

      <div className="mt-8 space-y-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("price")}
              className={`rounded-md border px-3 py-2 text-sm ${
                mode === "price"
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              {t.modePrice}
            </button>
            <button
              type="button"
              onClick={() => setMode("budget")}
              className={`rounded-md border px-3 py-2 text-sm ${
                mode === "budget"
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              {t.modeBudget}
            </button>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            {mode === "price" ? t.modePriceHint : t.modeBudgetHint}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mode === "price" ? (
            <div>
              <label htmlFor="vehicle-price" className="block text-sm font-medium">
                {t.vehiclePrice}
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
          ) : (
            <div>
              <label htmlFor="monthly-budget" className="block text-sm font-medium">
                {t.monthlyBudget}
                <span className="block text-xs font-normal text-neutral-500">
                  {t.monthlyBudgetHint}
                  {parseAmount(monthlyInsuranceEstimate) > 0 ? t.monthlyBudgetInsuranceSuffix : ""}
                </span>
              </label>
              <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
                <span className="text-neutral-400">$</span>
                <input
                  id="monthly-budget"
                  type="number"
                  min="0"
                  step="10"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="down-payment" className="block text-sm font-medium">
              {t.downPayment}
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
              {t.tradeIn}
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
            <label htmlFor="trade-in-payoff" className="block text-sm font-medium">
              {t.tradeInPayoff}
              <span className="block text-xs font-normal text-neutral-500">{t.tradeInPayoffHint}</span>
            </label>
            <div className="mt-1 flex items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
              <span className="text-neutral-400">$</span>
              <input
                id="trade-in-payoff"
                type="number"
                min="0"
                step="100"
                placeholder="0"
                value={tradeInPayoff}
                onChange={(e) => setTradeInPayoff(e.target.value)}
                className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="apr" className="block text-sm font-medium">
              {t.apr}
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
              {t.salesTax}
              <span className="block text-xs font-normal text-neutral-500">{t.salesTaxHint}</span>
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
              {t.fees}
              <span className="block text-xs font-normal text-neutral-500">{t.feesHint}</span>
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
          <label className="block text-sm font-medium">{t.loanTerm}</label>
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
                {months} {t.moSuffix}
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
                placeholder={t.customTermPlaceholder}
                value={!isPresetTerm ? termMonths : customTermRaw}
                onChange={(e) => handleCustomTermChange(e.target.value)}
                className="w-16 bg-transparent py-2 text-center text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-neutral-400">{t.moSuffix}</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-neutral-500">{t.termHint(MAX_CUSTOM_TERM_MONTHS)}</p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rollTaxAndFeesIntoLoan}
            onChange={(e) => setRollTaxAndFeesIntoLoan(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700"
          />
          {t.rollTaxAndFees}
          <span className="text-neutral-500">{t.rollTaxAndFeesHint}</span>
        </label>

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium">
            {t.insurance}
            <span className="block text-xs font-normal text-neutral-500">{t.insuranceHint}</span>
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

        {result.negativeEquity > 0 && (
          <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {t.negativeEquityWarning(
              currency.format(parseAmount(tradeInPayoff)),
              currency.format(parseAmount(tradeInValue)),
              currency.format(result.negativeEquity),
            )}
          </p>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-neutral-200 pt-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          {mode === "budget" && (
            <>
              <span>{t.monthlyPayment}</span>
              <span className="text-right">{currency.format(result.monthlyPayment)}</span>
            </>
          )}
          {result.negativeEquity > 0 && (
            <>
              <span>{t.negativeEquityRolledIn}</span>
              <span className="text-right">{currency.format(result.negativeEquity)}</span>
            </>
          )}
          <span>{t.amountFinanced}</span>
          <span className="text-right">{currency.format(result.amountFinanced)}</span>
          <span>{t.dueAtSigning}</span>
          <span className="text-right">{currency.format(result.dueAtSigning)}</span>
          <span>{t.totalInterest}</span>
          <span className="text-right">{currency.format(result.totalInterest)}</span>
          {result.totalInsuranceOverTerm > 0 && (
            <>
              <span>{t.insuranceOver(termMonths)}</span>
              <span className="text-right">{currency.format(result.totalInsuranceOverTerm)}</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="text-xs text-neutral-500">
              {mode === "budget" ? t.vehiclePriceAfford : t.monthlyPayment}
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              {mode === "budget"
                ? currency.format(affordability.vehiclePrice)
                : currency.format(result.monthlyPayment)}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="text-xs text-neutral-500">{t.trueTotalCost}</p>
            <p className="text-2xl font-semibold tracking-tight">
              {currency.format(result.trueTotalCost)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">
          {mode === "budget" ? t.comparisonTitleBudget : t.comparisonTitlePrice}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {mode === "budget"
            ? t.comparisonSubtitleBudget
            : t.comparisonSubtitlePrice(!isPresetTerm ? t.comparisonSubtitleCustomSuffix : "")}
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-xs text-neutral-500 dark:border-neutral-800">
                <th className="px-4 py-2 font-medium">{t.term}</th>
                <th className="px-4 py-2 font-medium">
                  {mode === "budget" ? t.priceAfford : t.monthly}
                </th>
                <th className="px-4 py-2 font-medium">{t.totalInterest}</th>
                <th className="px-4 py-2 font-medium">{t.trueTotalCost}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.termMonths}
                  className={`border-b border-neutral-100 last:border-0 dark:border-neutral-900 ${
                    row.termMonths === termMonths
                      ? "bg-neutral-100 dark:bg-neutral-900"
                      : ""
                  }`}
                >
                  <td className="px-4 py-2 font-medium">{row.termMonths} {t.moSuffix}</td>
                  <td className="px-4 py-2">{row.primary}</td>
                  <td className="px-4 py-2">{currencyWhole.format(row.totalInterest)}</td>
                  <td className="px-4 py-2">{currencyWhole.format(row.trueTotalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">{t.payExtraTitle}</h2>
        <p className="mt-1 text-sm text-neutral-500">{t.payExtraSubtitle}</p>
        <div className="mt-3 flex items-center gap-2">
          <label htmlFor="extra-payment" className="text-sm font-medium">
            {t.extraPerMonth}
          </label>
          <div className="flex w-32 items-center rounded-md border border-neutral-300 px-3 dark:border-neutral-700">
            <span className="text-neutral-400">$</span>
            <input
              id="extra-payment"
              type="number"
              min="0"
              step="10"
              placeholder="0"
              value={extraPerMonth}
              onChange={(e) => setExtraPerMonth(e.target.value)}
              className="w-full bg-transparent py-2 pl-1 text-sm outline-none"
            />
          </div>
        </div>
        {parseAmount(extraPerMonth) > 0 && (
          <p className="mt-3 rounded-md bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-900">
            {extraPaymentImpact.monthsSaved > 0
              ? t.extraPaymentResult(
                  currency.format(parseAmount(extraPerMonth)),
                  extraPaymentImpact.monthsSaved,
                  extraPaymentImpact.monthsToPayoff,
                  extraPaymentImpact.baselineMonths,
                  currency.format(extraPaymentImpact.interestSaved),
                )
              : t.extraPaymentNoEffect}
          </p>
        )}
      </div>

      <ul className="mt-6 list-inside list-disc space-y-1 text-xs text-neutral-500">
        {t.footnotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
