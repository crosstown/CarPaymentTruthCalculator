import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology — Car Payment Truth Calculator",
  description:
    "How the Car Payment Truth Calculator computes your monthly payment and true total cost -- the formula, assumptions, and what it doesn't model.",
  alternates: {
    canonical: "/methodology",
    languages: {
      "en-US": "https://carpaymenttruth.com/methodology",
      es: "https://carpaymenttruth.com/es/methodology",
    },
  },
};

export default function Methodology() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to calculator
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Methodology</h1>
      <p className="mt-1 text-sm text-neutral-500">Last reviewed: September 14, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Monthly payment formula
          </h2>
          <p className="mt-2">
            The calculator uses the standard fixed-rate amortization formula
            for a level monthly payment M on principal P, at monthly interest
            rate r, over n months:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-neutral-100 p-3 text-xs dark:bg-neutral-900">
            M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)
          </pre>
          <p className="mt-2">
            r is your annual percentage rate (APR) divided by 12. If APR is
            0% (a promotional/interest-free loan), the payment is simply
            principal divided by term length.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            What counts as &quot;amount financed&quot;
          </h2>
          <p className="mt-2">
            Amount financed = vehicle price − trade-in value − down payment,
            plus sales tax and fees if you choose to roll them into the loan
            (the default). If you uncheck &quot;roll tax &amp; fees into the
            loan,&quot; they&apos;re added to your cash due at signing instead
            and excluded from the financed principal -- meaning you don&apos;t
            pay interest on them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            How sales tax is handled
          </h2>
          <p className="mt-2">
            The calculator assumes the common case: sales tax is charged on
            the vehicle price <em>net of trade-in value</em> (a
            &quot;trade-in tax credit&quot;), using the combined state +
            local rate you enter. A handful of states -- notably California
            -- tax the full vehicle price regardless of trade-in, so the
            estimate may overstate your true tax there. Always confirm the
            rule for your state before relying on the number.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            How the insurance estimate works
          </h2>
          <p className="mt-2">
            The insurance field is opt-in only -- the calculator never
            generates or assumes an insurance figure on your behalf. Whatever
            you enter is simply multiplied by your loan term and added to
            &quot;true total cost.&quot; Leave it blank if you don&apos;t
            have a quote yet; the rest of the numbers will still be accurate.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            What this calculator does not model
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Variable-rate or step-rate loans (APR is assumed fixed for the full term)</li>
            <li>Balloon payments</li>
            <li>Leases</li>
            <li>
              Dealer add-ons (extended warranty, GAP, paint protection, etc.) beyond the flat
              &quot;fees&quot; field -- see the{" "}
              <Link href="/dealer-add-on-cost-calculator" className="text-blue-600 underline dark:text-blue-400">
                dealer add-on cost calculator
              </Link>{" "}
              for that specifically
            </li>
            <li>Lender-specific approval, credit-tier pricing, or promotional rates</li>
          </ul>
          <p className="mt-2 text-xs text-neutral-500">
            Negative equity carried over from a trade-in loan (the &quot;still owed on
            trade-in&quot; field) IS modeled -- it&apos;s rolled into the amount financed
            per the trade-in handling above.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Sources
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFPB — What is amortization and how could it affect my auto loan?
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFPB — How do I compare auto loan offers?
              </a>
            </li>
            <li>
              <a
                href="https://consumer.ftc.gov/articles/financing-or-leasing-car"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                FTC — Financing or Leasing a Car
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Questions about the math?
          </h2>
          <p className="mt-2">
            Email{" "}
            <a
              href="mailto:royalplanet2009@gmail.com"
              className="text-blue-600 underline dark:text-blue-400"
            >
              royalplanet2009@gmail.com
            </a>{" "}
            or see the{" "}
            <Link href="/disclaimer" className="text-blue-600 underline dark:text-blue-400">
              disclaimer
            </Link>{" "}
            for the calculator&apos;s limits.
          </p>
        </section>
      </div>
    </div>
  );
}
