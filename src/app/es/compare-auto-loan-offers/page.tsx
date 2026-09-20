import type { Metadata } from "next";
import Link from "next/link";
import CompareOffersCalculator from "@/components/CompareOffersCalculator";

export const metadata: Metadata = {
  title: "Comparar Ofertas de Préstamos de Auto | Concesionario vs Banco",
  description:
    "Compara 2-3 ofertas de préstamo de auto lado a lado -- concesionario, cooperativa de crédito, preaprobación bancaria -- por pago mensual, interés total y costo real.",
  alternates: {
    canonical: "/es/compare-auto-loan-offers",
    languages: {
      "en-US": "https://carpaymenttruth.com/compare-auto-loan-offers",
      es: "https://carpaymenttruth.com/es/compare-auto-loan-offers",
    },
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://carpaymenttruth.com/es" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Comparar Ofertas de Préstamos de Auto",
      item: "https://carpaymenttruth.com/es/compare-auto-loan-offers",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "¿Debería comparar ofertas de préstamo por el pago mensual o el costo total?",
    a: "Por el costo total. Dos ofertas pueden tener pagos mensuales casi idénticos mientras una cuesta miles más en total, si extiende el plazo para lograrlo. La CFPB específicamente recomienda comparar ofertas por costo total, no solo el pago.",
  },
  {
    q: "¿Por qué el financiamiento del concesionario tendría un APR más alto que una cooperativa de crédito?",
    a: "Los concesionarios a menudo aumentan la tasa de interés que reciben de un prestamista como compensación por gestionar el préstamo. Obtener una preaprobación de un banco o cooperativa antes de visitar el concesionario te da un número real para comparar -- y a veces influencia para negociar la tasa del concesionario a la baja.",
  },
  {
    q: "¿Puedo usar una preaprobación para negociar en el concesionario?",
    a: "Sí. Una preaprobación te da un APR concreto que superar. Los concesionarios a veces pueden igualarlo o superarlo con financiamiento promocional del fabricante, pero sabrás de inmediato si su oferta es realmente mejor o solo está estructurada para parecerlo (por ejemplo, un pago más bajo por un plazo más largo).",
  },
  {
    q: "¿Qué pasa si una oferta tiene un plazo mucho más corto?",
    a: "Un plazo más corto usualmente significa un pago mensual más alto pero menos interés total -- compara el costo total, y considera aparte si el pago más alto cabe en tu presupuesto. Esta herramienta muestra ambos.",
  },
  {
    q: "¿Importan los cargos en la comparación?",
    a: "Sí -- cargos de originación, cargos de trámites, u otros cargos específicos del prestamista se suman al costo total aunque no aparezcan en el pago mensual. Ingrésalos para cada oferta para obtener una comparación de costo total precisa.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function CompareAutoLoanOffersPageEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Comparar Ofertas de Préstamos de Auto
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Financiamiento del concesionario, un préstamo de cooperativa de
        crédito, una preaprobación bancaria -- mismo auto, mismo monto
        prestado, diferentes plazos. Ingresa cada oferta abajo para ver cuál
        realmente cuesta menos, no solo cuál tiene el pago más bajo.
      </p>

      <div className="mt-8">
        <CompareOffersCalculator locale="es" />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          El pago más bajo no siempre es la mejor oferta
        </h2>
        <p className="mt-2">
          Una oferta de plazo más largo puede superar a una de plazo más
          corto en pago mensual mientras sigue costando más en total, porque
          cobra interés durante más meses. Esta herramienta mantiene fijo el
          monto del préstamo en todas las ofertas y compara el costo total
          -- monto financiado más interés total más cualquier cargo
          específico de la oferta -- para que un pago más bajo por un plazo
          más largo no parezca una ventaja que no es.
        </p>

        <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Preguntas frecuentes
        </h2>
        <div className="mt-3 space-y-4">
          {FAQ_ITEMS.map(({ q, a }) => (
            <div key={q}>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">{q}</p>
              <p className="mt-1">{a}</p>
            </div>
          ))}
        </div>

        <p className="mt-8">
          <Link href="/es" className="text-blue-600 underline dark:text-blue-400">
            Calculadora de la Verdad del Pago del Auto
          </Link>{" "}
          — calculadora completa con auto a cambio, impuestos y cargos para un solo préstamo.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          Esto es un estimado con fines informativos generales, no es
          asesoría financiera ni de préstamos. Última revisión: septiembre de 2026.
        </p>
      </section>
    </div>
  );
}
