import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import VisitorCounter from "@/components/VisitorCounter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Lets each page's `alternates.canonical` be a relative path ("/",
  // "/privacy") and actually emits a canonical tag at all. Added
  // proactively 2026-09-04 -- paycheckovertime.com's Search Console
  // flagged "Duplicate without user-selected canonical" for the same
  // www-vs-bare-domain reason this site also has.
  metadataBase: new URL("https://carpaymenttruth.com"),
  title: "Car Payment Truth Calculator",
  description:
    "See the real cost of a car loan -- total interest, fees, and how loan term length changes what you actually pay, not just the monthly payment. Free, no sign-up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* AdSense verification: a plain literal <script> tag, not next/script
            -- see paycheckovertime.com's layout.tsx for why next/script's
            optimized strategies don't satisfy Google's literal-markup check. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5479758505355786"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <VisitorCounter />
        </footer>
      </body>
    </html>
  );
}
