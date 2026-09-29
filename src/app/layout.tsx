import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-0PZHK2RB1Q";

// Reused by openGraph/twitter below so the description only needs to be
// true (and match real search intent) in one place. Explicitly mentions
// sales tax -- Search Console showed real recurring query volume for
// "car/auto payment calculator with tax" that this description wasn't
// matching, even though the calculator has a sales-tax input and the
// WebApplication JSON-LD below already said "taxes."
const SITE_DESCRIPTION =
  "See the real cost of a car loan -- total interest, sales tax, fees, and how loan term length changes what you actually pay, not just the monthly payment. Free, no sign-up.";

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
  description: SITE_DESCRIPTION,
  // Site-wide fallback so every page at least gets a title/description card
  // on social shares and link previews instead of a bare URL. Subpages that
  // set their own `title`/`description` don't inherit those into this
  // object automatically (Next doesn't cross-populate openGraph from the
  // plain title/description fields), so shared links to subpages will show
  // this generic card rather than their own -- a known gap, not fixed here.
  openGraph: {
    type: "website",
    siteName: "Car Payment Truth Calculator",
    title: "Car Payment Truth Calculator",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Payment Truth Calculator",
    description: SITE_DESCRIPTION,
  },
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
        {/* No literal-markup requirement like AdSense's tag above, so
            next/script's optimized loading is fine here. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <LanguageToggle />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
