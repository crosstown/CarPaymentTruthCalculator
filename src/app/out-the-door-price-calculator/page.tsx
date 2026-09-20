import type { Metadata } from "next";
import Link from "next/link";
import OutTheDoorCalculator from "@/components/OutTheDoorCalculator";

export const metadata: Metadata = {
  title: "Out-the-Door Price Calculator | Car Price With Tax, Fees & Rebates",
  description:
    "Calculate the real out-the-door price of a car: vehicle price, sales tax, doc fee, registration, trade-in, and rebates -- the total before any loan is involved.",
  alternates: {
    canonical: "/out-the-door-price-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/out-the-door-price-calculator",
      es: "https://carpaymenttruth.com/es/out-the-door-price-calculator",
    },
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://carpaymenttruth.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Out-the-Door Price Calculator",
      item: "https://carpaymenttruth.com/out-the-door-price-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "What is the out-the-door price of a car?",
    a: "The total amount you actually pay to drive the car home: the negotiated vehicle price, minus any trade-in value and rebates, plus sales tax and all dealer/DMV fees. It's the real price of the transaction, separate from how (or whether) you finance it.",
  },
  {
    q: "Why is the out-the-door price different from the sticker price?",
    a: "The sticker price is just the vehicle. Sales tax, documentation fees, registration, and other charges are added on top -- and while a rebate lowers what you pay, most states still tax the price before the rebate is applied, so the tax doesn't shrink along with it.",
  },
  {
    q: "Does a trade-in reduce sales tax?",
    a: "In most states, yes -- you're taxed on the price minus your trade-in value, not the full price. A handful of states (notably California) tax the full vehicle price regardless of trade-in. Check your state's DMV rules for specifics.",
  },
  {
    q: "Does a manufacturer rebate reduce sales tax too?",
    a: "Usually not. Most states treat a manufacturer rebate as a price reduction from the manufacturer to the dealer, not a discount the buyer negotiated, so sales tax is typically still calculated on the pre-rebate price even though the rebate lowers what you actually pay.",
  },
  {
    q: "What fees should I expect beyond tax?",
    a: "A documentation (\"doc\") fee for paperwork processing, registration/title fees to the state, and sometimes smaller charges like plate transfer fees. These vary significantly by state and dealer -- ask for an itemized breakdown before signing.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function OutTheDoorPriceCalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to calculator
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Out-the-Door Price Calculator
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        The number on the window sticker isn&apos;t what you&apos;ll actually
        pay. Tax, fees, your trade-in, and any rebate all change the real
        total -- before financing even enters the picture. Enter your
        numbers below to see the true out-the-door price.
      </p>

      <div className="mt-8">
        <OutTheDoorCalculator />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Out-the-door price vs. financed price
        </h2>
        <p className="mt-2">
          This is the price of the car itself -- it&apos;s the number you&apos;d
          pay in cash. If you&apos;re financing, the amount financed (and
          what it actually costs once interest is added over the loan term)
          is a separate question. See the{" "}
          <Link href="/" className="text-blue-600 underline dark:text-blue-400">
            full loan calculator
          </Link>{" "}
          for the financed total.
        </p>

        <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Frequently asked questions
        </h2>
        <div className="mt-3 space-y-4">
          {FAQ_ITEMS.map(({ q, a }) => (
            <div key={q}>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">{q}</p>
              <p className="mt-1">{a}</p>
            </div>
          ))}
        </div>

        <p className="mt-8">
          <Link href="/" className="text-blue-600 underline dark:text-blue-400">
            Car Payment Truth Calculator
          </Link>{" "}
          — see the monthly payment and total interest if you finance this
          purchase.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          This is an estimate for general informational purposes only, not
          financial or legal advice. Last reviewed: September 2026.
        </p>
      </section>
    </div>
  );
}
