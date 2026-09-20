import type { Metadata } from "next";
import Link from "next/link";
import RefinanceSavingsCalculator from "@/components/RefinanceSavingsCalculator";

export const metadata: Metadata = {
  title: "Auto Refinance Savings Calculator | Should You Refinance Your Car Loan?",
  description:
    "See your real monthly savings, total interest saved, and break-even point if you refinance your car loan -- compare your current loan against a new offer.",
  alternates: {
    canonical: "/auto-refinance-savings-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/auto-refinance-savings-calculator",
      es: "https://carpaymenttruth.com/es/auto-refinance-savings-calculator",
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
      name: "Auto Refinance Savings Calculator",
      item: "https://carpaymenttruth.com/auto-refinance-savings-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "When does it make sense to refinance a car loan?",
    a: "Generally when your credit has improved since you got the original loan, rates have dropped, or you want to change your term length -- and the new APR is enough lower that the monthly (and often total-interest) savings clearly outweigh any refinance fees. This calculator shows both numbers for your specific situation.",
  },
  {
    q: "What is the break-even point on a refinance?",
    a: "The number of months of monthly savings it takes to recoup any fees charged to refinance. If you plan to keep the car (and the loan) longer than the break-even point, refinancing is a net win on top of the fees; if you're likely to sell or pay it off sooner, it might not be worth it.",
  },
  {
    q: "Can refinancing to a lower payment cost more overall?",
    a: "Yes -- if the new loan resets or extends the term, a lower monthly payment can still mean paying more total interest than finishing out the current loan, especially if you're refinancing late in the original term when most of the interest is already behind you. Always check total interest, not just the payment.",
  },
  {
    q: "Does refinancing hurt my credit score?",
    a: "Applying triggers a hard credit inquiry, which can cause a small, temporary dip. Shopping multiple lenders within a short window (typically 14-45 days depending on the scoring model) is usually treated as a single inquiry for rate-shopping purposes.",
  },
  {
    q: "Can I refinance if I'm underwater on my loan?",
    a: "It's harder, since lenders are financing more than the car is worth, but some lenders do offer it, often at a less favorable rate. Rolling negative equity into a refinance extends how long you'd stay underwater -- see the trade-in negative equity handling on the homepage calculator for how that's modeled in a purchase context.",
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

export default function AutoRefinanceSavingsCalculatorPage() {
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
        Auto Refinance Savings Calculator
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        A lower rate doesn&apos;t automatically mean a better deal. See your
        real monthly savings, total interest difference, and how long it
        takes to break even on any refinance fees.
      </p>

      <div className="mt-8">
        <RefinanceSavingsCalculator />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Why total interest matters as much as the monthly payment
        </h2>
        <p className="mt-2">
          Refinancing resets the clock on interest calculated against
          whatever term you choose. A new loan at a lower rate but a longer
          term can lower your payment while still costing more in total
          interest than just finishing your current loan -- especially if
          you're several years into it already, since auto loans are
          front-loaded with interest and much of that cost is already
          behind you. This tool compares both numbers side by side so a
          lower payment doesn&apos;t look like savings it isn&apos;t.
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
          — full calculator for a new car purchase, with trade-in, tax, and fees.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          This is an estimate for general informational purposes only, not
          financial or lending advice. Last reviewed: September 2026.
        </p>
      </section>
    </div>
  );
}
