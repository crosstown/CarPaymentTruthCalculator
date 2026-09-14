import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Car Payment Truth Calculator",
  description:
    "Who built the Car Payment Truth Calculator and why -- an independent, ad-supported tool for seeing the real cost of a car loan.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to calculator
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">About</h1>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <p>
            Car Payment Truth Calculator is a free, independent tool built
            around one idea: the monthly payment a dealer quotes you isn&apos;t
            the price of the car. A longer loan term can make almost any
            vehicle look affordable on a monthly basis while quietly adding
            thousands of dollars in extra interest over the life of the loan.
            This calculator exists to make that trade-off visible before you
            sign.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            What it is
          </h2>
          <p className="mt-2">
            A browser-based calculator that takes the numbers a dealer or
            lender gives you -- price, down payment, trade-in, APR, tax,
            fees, and term -- and shows the amount financed, total interest,
            and true total cost, including a side-by-side comparison across
            every common loan term (36-84 months). See the{" "}
            <Link href="/methodology" className="text-blue-600 underline dark:text-blue-400">
              methodology page
            </Link>{" "}
            for the exact formula and assumptions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            What it isn&apos;t
          </h2>
          <p className="mt-2">
            This site isn&apos;t a lender, dealer, broker, or financial
            advisor, and it doesn&apos;t sell leads to one. It doesn&apos;t
            require an account, doesn&apos;t collect the numbers you enter,
            and doesn&apos;t make loan offers. It&apos;s a calculator, not
            financial advice -- see the{" "}
            <Link href="/disclaimer" className="text-blue-600 underline dark:text-blue-400">
              disclaimer
            </Link>{" "}
            for specifics.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            How it&apos;s funded
          </h2>
          <p className="mt-2">
            The site is free to use and supported by Google AdSense
            advertising, not by lender referral fees. See the{" "}
            <Link href="/privacy" className="text-blue-600 underline dark:text-blue-400">
              privacy policy
            </Link>{" "}
            for how advertising cookies work here.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Questions or feedback?
          </h2>
          <p className="mt-2">
            Get in touch on the{" "}
            <Link href="/contact" className="text-blue-600 underline dark:text-blue-400">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
