"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitorCounter from "@/components/VisitorCounter";

const TOOLS = {
  en: [
    { href: "/72-vs-84-month-car-loan", label: "72 vs 84 Month Loan" },
    { href: "/out-the-door-price-calculator", label: "Out-the-Door Price" },
    { href: "/dealer-add-on-cost-calculator", label: "Dealer Add-On Cost" },
    { href: "/compare-auto-loan-offers", label: "Compare Loan Offers" },
    { href: "/auto-refinance-savings-calculator", label: "Refinance Savings" },
  ],
  es: [
    { href: "/es/72-vs-84-month-car-loan", label: "Préstamo 72 vs 84 Meses" },
    { href: "/es/out-the-door-price-calculator", label: "Precio Total" },
    { href: "/es/dealer-add-on-cost-calculator", label: "Costo de Complementos" },
    { href: "/es/compare-auto-loan-offers", label: "Comparar Ofertas" },
    { href: "/es/auto-refinance-savings-calculator", label: "Ahorro al Refinanciar" },
  ],
} as const;

const TRUST = {
  en: [
    { href: "/about", label: "About" },
    { href: "/methodology", label: "Methodology" },
    { href: "/contact", label: "Contact" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  es: [
    { href: "/es/about", label: "Acerca de" },
    { href: "/es/methodology", label: "Metodología" },
    { href: "/es/contact", label: "Contacto" },
    { href: "/es/disclaimer", label: "Aviso Legal" },
    { href: "/es/privacy", label: "Política de Privacidad" },
  ],
} as const;

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

  return (
    <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {TOOLS[locale].map(({ href, label }) => (
          <Link key={href} href={href} className="hover:underline">
            {label}
          </Link>
        ))}
      </nav>
      <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {TRUST[locale].map(({ href, label }) => (
          <Link key={href} href={href} className="hover:underline">
            {label}
          </Link>
        ))}
      </nav>
      <VisitorCounter locale={locale} />
    </footer>
  );
}
