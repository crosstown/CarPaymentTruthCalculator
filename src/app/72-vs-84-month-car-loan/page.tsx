import type { Metadata } from "next";
import Link from "next/link";
import SeventyTwoVsEightyFourCalculator from "@/components/SeventyTwoVsEightyFourCalculator";

export const metadata: Metadata = {
  title: "72 vs 84 Month Car Loan: True Cost Comparison Calculator",
  description:
    "Is an 84-month car loan bad? Compare the real monthly payment, total interest, and true total cost of a 72-month vs 84-month auto loan side by side.",
  alternates: {
    canonical: "/72-vs-84-month-car-loan",
    languages: {
      "en-US": "https://carpaymenttruth.com/72-vs-84-month-car-loan",
      es: "https://carpaymenttruth.com/es/72-vs-84-month-car-loan",
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
      name: "72 vs 84 Month Car Loan",
      item: "https://carpaymenttruth.com/72-vs-84-month-car-loan",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "Is an 84-month car loan bad?",
    a: "Not automatically -- but it's expensive. An 84-month loan lowers your monthly payment compared to a 72-month loan on the same car, but you pay interest for a full extra year on a balance that's paying down more slowly, so total interest is meaningfully higher. It also raises the risk of being underwater (owing more than the car is worth) for longer, since cars depreciate faster than a long loan pays down principal.",
  },
  {
    q: "How much more does an 84-month loan cost than a 72-month loan?",
    a: "It depends on the loan amount and APR, but the pattern is consistent: the monthly payment drops, and the total interest paid rises, every time. Use the calculator above with your own numbers to see the exact dollar difference for your loan.",
  },
  {
    q: "Why do longer loans often have higher APRs too?",
    a: "Lenders view longer terms as higher risk -- more time for something to go wrong -- so 84-month loans sometimes carry a higher APR than the same lender would offer on a 60 or 72-month loan. That compounds with the extra months of interest, making the true cost gap even larger than the term difference alone would suggest.",
  },
  {
    q: "When might an 84-month loan make sense?",
    a: "If the lower payment is genuinely necessary to fit a budget, and you plan to keep the car for the full loan term (or longer) rather than trade it in early, an 84-month loan can be a reasonable trade-off -- as long as you go in aware of the total interest cost, not just the payment.",
  },
  {
    q: "What's the risk of being underwater on a long car loan?",
    a: "Cars lose value quickly in the first few years, often faster than a 72 or 84-month loan pays down the principal. If you owe more than the car is worth and need to sell or trade it in, the shortfall (negative equity) typically gets rolled into your next loan -- see the calculator on the homepage for how that's modeled.",
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

export default function SeventyTwoVsEightyFourPage() {
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
        72 vs 84 Month Car Loan
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        The extra year on an 84-month loan lowers your payment, but it doesn&apos;t
        lower what the car actually costs -- it raises it. Enter your numbers
        below to see exactly how much a 72-month loan and an 84-month loan
        differ, on the same car.
      </p>

      <div className="mt-8">
        <SeventyTwoVsEightyFourCalculator />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Why the extra 12 months costs more than it looks like
        </h2>
        <p className="mt-2">
          Auto loans are front-loaded with interest: early payments are
          mostly interest, later ones mostly principal. Adding 12 months to
          a loan doesn&apos;t just spread the same interest over more
          payments -- it adds 12 more months of interest charges on a
          balance that&apos;s still relatively high, because the shorter
          loan would have already paid a chunk of it down by then. That&apos;s
          why the gap in total interest between 72 and 84 months is
          consistently larger than a simple 12/72 = 17% increase would
          suggest.
        </p>

        <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Worked example
        </h2>
        <p className="mt-2">
          $34,950 financed at 7.5% APR:
        </p>
        <ul className="mt-1 list-inside list-disc space-y-0.5">
          <li>72 months: $604.29/mo, $8,559 total interest</li>
          <li>84 months: $536.07/mo, $10,080 total interest</li>
        </ul>
        <p className="mt-1">
          The payment drops by about $68/mo, but that costs an extra
          $1,521 in interest over the life of the loan -- roughly $127 for
          every $1 of monthly payment relief, spread across the extra 12
          months.
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
          — full calculator with trade-in, taxes, fees, and every common loan
          term from 36 to 84 months.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          This is an estimate for general informational purposes only, not
          financial or lending advice. Last reviewed: September 2026.
        </p>
      </section>
    </div>
  );
}
