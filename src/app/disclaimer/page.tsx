import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — Car Payment Truth Calculator",
  description:
    "This calculator is for educational estimates only -- it is not financial, legal, tax, or lending advice.",
  alternates: {
    canonical: "/disclaimer",
    languages: {
      "en-US": "https://carpaymenttruth.com/disclaimer",
      es: "https://carpaymenttruth.com/es/disclaimer",
    },
  },
};

export default function Disclaimer() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to calculator
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Disclaimer</h1>
      <p className="mt-1 text-sm text-neutral-500">Last reviewed: September 14, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <p>
            This calculator is for educational estimates only. It is not
            financial, legal, tax, or lending advice. Actual loan terms
            depend on lender approval, credit profile, vehicle, taxes, fees,
            insurance, and state rules -- your real offer may differ from
            what this tool shows.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            No relationship with lenders or dealers
          </h2>
          <p className="mt-2">
            Car Payment Truth Calculator is independent. We are not a lender,
            dealer, broker, credit union, or financial institution, and we
            don&apos;t receive compensation for loan referrals. The
            calculator doesn&apos;t submit your information anywhere -- see
            the{" "}
            <Link href="/privacy" className="text-blue-600 underline dark:text-blue-400">
              privacy policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Estimates, not quotes
          </h2>
          <p className="mt-2">
            Every figure is calculated from the numbers you enter, using
            standard fixed-rate loan amortization. See the{" "}
            <Link href="/methodology" className="text-blue-600 underline dark:text-blue-400">
              methodology page
            </Link>{" "}
            for the exact formula and what the calculator does not account
            for (variable rates, balloon payments, leases, dealer add-ons,
            and lender-specific approval terms).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Before you sign
          </h2>
          <p className="mt-2">
            Confirm your actual APR, term, fees, and total cost directly with
            your lender or dealer in writing. For general guidance on
            comparing auto loan offers, see the{" "}
            <a
              href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/"
              className="text-blue-600 underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consumer Financial Protection Bureau
            </a>{" "}
            or{" "}
            <a
              href="https://consumer.ftc.gov/articles/financing-or-leasing-car"
              className="text-blue-600 underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Federal Trade Commission
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
