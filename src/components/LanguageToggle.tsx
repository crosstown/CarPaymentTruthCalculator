"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Static export can't use Next's built-in i18n routing (it needs a Node
 * server), so Spanish lives as a plain parallel route tree under /es/...
 * with the same slugs as the English pages -- which makes the toggle just
 * a matter of adding/stripping that one path segment, no translation-table
 * lookup needed to know where "this same page in the other language" is.
 */
export default function LanguageToggle() {
  const pathname = usePathname() ?? "/";
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const otherHref = isSpanish
    ? pathname.replace(/^\/es(\/|$)/, "/") || "/"
    : `/es${pathname === "/" ? "" : pathname}`;

  // The root layout's <html lang="en"> can't vary per-route on its own in a
  // statically-exported single layout tree, so this corrects it client-side
  // once we know which side of /es/ we're actually on -- browsers' built-in
  // "translate this page?" prompts and screen readers both key off this.
  useEffect(() => {
    document.documentElement.lang = isSpanish ? "es" : "en";
  }, [isSpanish]);

  return (
    <div className="flex justify-center gap-2 border-b border-neutral-200 bg-neutral-50 py-1.5 text-xs dark:border-neutral-800 dark:bg-neutral-950">
      <Link
        href={isSpanish ? otherHref : pathname}
        className={isSpanish ? "text-neutral-500 hover:underline" : "font-semibold text-neutral-900 dark:text-neutral-100"}
      >
        🇺🇸 English
      </Link>
      <span className="text-neutral-300 dark:text-neutral-700">|</span>
      <Link
        href={isSpanish ? pathname : otherHref}
        className={isSpanish ? "font-semibold text-neutral-900 dark:text-neutral-100" : "text-neutral-500 hover:underline"}
      >
        🇲🇽 Español
      </Link>
    </div>
  );
}
