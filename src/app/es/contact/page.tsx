import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto — Calculadora de la Verdad del Pago del Auto",
  description: "Ponte en contacto sobre la Calculadora de la Verdad del Pago del Auto.",
  alternates: {
    canonical: "/es/contact",
    languages: {
      "en-US": "https://carpaymenttruth.com/contact",
      es: "https://carpaymenttruth.com/es/contact",
    },
  },
};

export default function ContactEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Contacto</h1>

      <div className="mt-8 space-y-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <p>
          Preguntas sobre cómo se calcula un número, reportar un error, o
          comentarios en general -- todo es bienvenido.
        </p>
        <p>
          Escribe a{" "}
          <a
            href="mailto:royalplanet2009@gmail.com"
            className="text-blue-600 underline dark:text-blue-400"
          >
            royalplanet2009@gmail.com
          </a>
          .
        </p>
        <p className="text-xs text-neutral-500">
          Esta calculadora no ofrece préstamos, financiamiento, ni asesoría
          financiera personalizada -- para eso, ve el{" "}
          <Link href="/es/disclaimer" className="text-blue-600 underline dark:text-blue-400">
            aviso legal
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
