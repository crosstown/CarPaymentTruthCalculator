import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Car Payment Truth Calculator",
  description: "Get in touch about the Car Payment Truth Calculator.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to calculator
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Contact</h1>

      <div className="mt-8 space-y-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <p>
          Questions about how a number is calculated, a bug report, or
          general feedback -- all welcome.
        </p>
        <p>
          Email{" "}
          <a
            href="mailto:royalplanet2009@gmail.com"
            className="text-blue-600 underline dark:text-blue-400"
          >
            royalplanet2009@gmail.com
          </a>
          .
        </p>
        <p className="text-xs text-neutral-500">
          This calculator doesn&apos;t offer loans, financing, or personalized
          financial advice -- for that, see the{" "}
          <Link href="/disclaimer" className="text-blue-600 underline dark:text-blue-400">
            disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
