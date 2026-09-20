import type { Metadata } from "next";
import Link from "next/link";
import CompareOffersCalculator from "@/components/CompareOffersCalculator";

export const metadata: Metadata = {
  title: "Compare Auto Loan Offers | Dealer vs Credit Union vs Bank Calculator",
  description:
    "Compare 2-3 auto loan offers side by side -- dealer financing, credit union, bank pre-approval -- by monthly payment, total interest, and true total cost.",
  alternates: { canonical: "/compare-auto-loan-offers" },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://carpaymenttruth.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Compare Auto Loan Offers",
      item: "https://carpaymenttruth.com/compare-auto-loan-offers",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Should I compare auto loan offers by monthly payment or total cost?",
    a: "Total cost. Two offers can have nearly identical monthly payments while one costs thousands more overall, if it stretches the term longer to get there. The CFPB specifically recommends comparing offers by total cost, not just the payment.",
  },
  {
    q: "Why would dealer financing have a higher APR than a credit union?",
    a: "Dealers often mark up the interest rate they receive from a lender as compensation for arranging the loan. Getting pre-approved by a bank or credit union before visiting the dealer gives you a real number to compare against -- and sometimes leverage to negotiate the dealer's rate down.",
  },
  {
    q: "Can I use a pre-approval to negotiate at the dealership?",
    a: "Yes. A pre-approval gives you a concrete APR to beat. Dealers can sometimes match or beat it through manufacturer incentive financing, but you'll know immediately if their offer is actually better or just structured to look that way (e.g. a lower payment from a longer term).",
  },
  {
    q: "What if one offer has a much shorter term?",
    a: "A shorter term usually means a higher monthly payment but less total interest -- compare total cost, and separately consider whether the higher payment fits your budget. This tool shows both.",
  },
  {
    q: "Do fees matter in the comparison?",
    a: "Yes -- origination fees, documentation fees, or other lender-specific charges add to the total cost even though they don't show up in the monthly payment. Enter them for each offer to get an accurate total-cost comparison.",
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

export default function CompareAutoLoanOffersPage() {
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
        Compare Auto Loan Offers
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Dealer financing, a credit union loan, a bank pre-approval -- same
        car, same amount borrowed, different terms. Enter each offer below
        to see which one actually costs less, not just which has the
        lowest payment.
      </p>

      <div className="mt-8">
        <CompareOffersCalculator />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          The lowest payment isn&apos;t always the best offer
        </h2>
        <p className="mt-2">
          A longer-term offer can undercut a shorter-term one on monthly
          payment while still costing more overall, because it charges
          interest for more months. This tool holds the loan amount fixed
          across every offer and compares total cost -- financed amount
          plus total interest plus any offer-specific fees -- so a lower
          payment from a longer term doesn&apos;t look like a win it
          isn&apos;t.
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
          — full calculator with trade-in, tax, and fees for a single loan.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          This is an estimate for general informational purposes only, not
          financial or lending advice. Last reviewed: September 2026.
        </p>
      </section>
    </div>
  );
}
