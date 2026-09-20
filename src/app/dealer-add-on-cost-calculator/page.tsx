import type { Metadata } from "next";
import Link from "next/link";
import AddOnCostCalculator from "@/components/AddOnCostCalculator";

export const metadata: Metadata = {
  title: "Dealer Add-On Cost Calculator | What Extended Warranties Really Cost",
  description:
    "See the real cost of rolling a dealer add-on -- extended warranty, GAP, paint protection -- into your car loan, including the interest it adds over the loan term.",
  alternates: {
    canonical: "/dealer-add-on-cost-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/dealer-add-on-cost-calculator",
      es: "https://carpaymenttruth.com/es/dealer-add-on-cost-calculator",
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
      name: "Dealer Add-On Cost Calculator",
      item: "https://carpaymenttruth.com/dealer-add-on-cost-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Why does a dealer add-on cost more than its sticker price?",
    a: "If you roll it into your car loan instead of paying cash, you're financing it at the same APR as the vehicle, for the same term. That means you pay interest on the add-on's price for years, on top of the price itself -- the calculator above shows exactly how much.",
  },
  {
    q: "Is GAP insurance worth it?",
    a: "GAP coverage pays the difference between your loan balance and your car's value if it's totaled or stolen while you owe more than it's worth -- genuinely useful if you have a small down payment or a long loan term, since those both increase the odds of being underwater. Whether it's worth the price depends on the cost quoted and how likely you are to need it; some auto insurers offer similar coverage for less than dealer GAP.",
  },
  {
    q: "Should I pay for add-ons in cash instead of financing them?",
    a: "If you can, yes -- paying cash avoids the interest cost entirely. If financing is the only option, at minimum know the true cost (price plus interest) before deciding whether the add-on is worth it, rather than just looking at how much it raises the monthly payment.",
  },
  {
    q: "Can I negotiate dealer add-on prices?",
    a: "Often, yes. Add-ons like paint protection, fabric protection, and VIN etching frequently carry large markups and can be negotiated down or declined outright. Extended warranties and GAP coverage can sometimes be purchased later, or from a third party, for less than the dealer's price.",
  },
  {
    q: "Do I have to buy add-ons to get financing?",
    a: "No. Dealer add-ons are optional. Under FTC guidance, lenders cannot require you to purchase add-on products as a condition of financing (though a package deal or promotional rate may be advertised alongside them) -- you're entitled to decline any add-on and still get the loan.",
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

export default function DealerAddOnCostCalculatorPage() {
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
        Dealer Add-On Cost Calculator
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        An extended warranty or GAP coverage doesn&apos;t just add its price to
        your loan -- if you finance it, you pay interest on it too, for the
        full length of the loan. See what a dealer add-on actually costs
        once it&apos;s rolled in.
      </p>

      <div className="mt-8">
        <AddOnCostCalculator />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Common dealer add-ons
        </h2>
        <p className="mt-2">
          Extended warranty / service contract, GAP coverage, paint and
          fabric protection, tire and wheel packages, VIN etching, and
          anti-theft packages are the most common add-ons offered at
          signing. Each one raises your amount financed if rolled into the
          loan -- and interest applies to that higher amount for the entire
          loan term, per the{" "}
          <Link href="/methodology" className="text-blue-600 underline dark:text-blue-400">
            same amortization math
          </Link>{" "}
          used for the vehicle itself.
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
          — see your full loan payment and total cost, add-ons included.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          This is an estimate for general informational purposes only, not
          financial, legal, or insurance advice. Last reviewed: September 2026.
        </p>
      </section>
    </div>
  );
}
