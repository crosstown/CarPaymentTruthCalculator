import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Car Payment Truth Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  url: "https://carpaymenttruth.com/",
  description:
    "Estimate your real car payment, total interest, taxes, fees, insurance and true total cost. Compare 36, 48, 60, 72 and 84-month auto loans before you buy.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageToggle />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
