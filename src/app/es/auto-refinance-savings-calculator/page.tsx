import type { Metadata } from "next";
import Link from "next/link";
import RefinanceSavingsCalculator from "@/components/RefinanceSavingsCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro al Refinanciar tu Préstamo de Auto",
  description:
    "Mira tu ahorro mensual real, el interés total ahorrado y el punto de equilibrio si refinancias tu préstamo de auto -- compara tu préstamo actual contra una oferta nueva.",
  alternates: {
    canonical: "/es/auto-refinance-savings-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/auto-refinance-savings-calculator",
      es: "https://carpaymenttruth.com/es/auto-refinance-savings-calculator",
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
      name: "Calculadora de Ahorro al Refinanciar",
      item: "https://carpaymenttruth.com/es/auto-refinance-savings-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "¿Cuándo tiene sentido refinanciar un préstamo de auto?",
    a: "Generalmente cuando tu historial crediticio ha mejorado desde que obtuviste el préstamo original, las tasas han bajado, o quieres cambiar el plazo -- y el APR nuevo es lo suficientemente más bajo para que el ahorro mensual (y a menudo en interés total) supere claramente cualquier cargo de refinanciamiento. Esta calculadora muestra ambos números para tu situación específica.",
  },
  {
    q: "¿Qué es el punto de equilibrio en un refinanciamiento?",
    a: "El número de meses de ahorro mensual que toma recuperar cualquier cargo cobrado por refinanciar. Si planeas quedarte con el auto (y el préstamo) más tiempo que el punto de equilibrio, refinanciar es una ganancia neta además de los cargos; si es probable que lo vendas o lo pagues antes, puede que no valga la pena.",
  },
  {
    q: "¿Puede refinanciar a un pago más bajo costar más en total?",
    a: "Sí -- si el préstamo nuevo reinicia o extiende el plazo, un pago mensual más bajo puede significar pagar más interés total que terminar el préstamo actual, especialmente si refinancias tarde en el plazo original cuando ya pasó la mayor parte del interés. Siempre revisa el interés total, no solo el pago.",
  },
  {
    q: "¿Refinanciar afecta mi puntaje de crédito?",
    a: "Aplicar genera una consulta de crédito \"dura\", que puede causar una baja pequeña y temporal. Comparar varios prestamistas en una ventana corta (típicamente 14-45 días según el modelo de puntaje) usualmente se trata como una sola consulta para efectos de comparación de tasas.",
  },
  {
    q: "¿Puedo refinanciar si estoy \"underwater\" en mi préstamo?",
    a: "Es más difícil, ya que los prestamistas estarían financiando más de lo que vale el auto, pero algunos prestamistas sí lo ofrecen, a menudo con una tasa menos favorable. Incluir capital negativo en un refinanciamiento extiende cuánto tiempo seguirás \"underwater\" -- ve el manejo de capital negativo del auto a cambio en la calculadora principal para ver cómo se modela en el contexto de una compra.",
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

export default function AutoRefinanceSavingsCalculatorPageEs() {
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
        Calculadora de Ahorro al Refinanciar
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Una tasa más baja no significa automáticamente un mejor trato. Mira
        tu ahorro mensual real, la diferencia en interés total, y cuánto
        tiempo toma recuperar cualquier cargo de refinanciamiento.
      </p>

      <div className="mt-8">
        <RefinanceSavingsCalculator locale="es" />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Por qué el interés total importa tanto como el pago mensual
        </h2>
        <p className="mt-2">
          Refinanciar reinicia el reloj de interés calculado sobre el plazo
          que elijas. Un préstamo nuevo con una tasa más baja pero un plazo
          más largo puede bajar tu pago mientras sigue costando más en
          interés total que simplemente terminar tu préstamo actual --
          especialmente si ya llevas varios años en él, ya que los
          préstamos de auto cargan más intereses al principio y gran parte
          de ese costo ya quedó atrás. Esta herramienta compara ambos
          números lado a lado para que un pago más bajo no parezca un
          ahorro que no es.
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
          — calculadora completa para una compra de auto nuevo, con auto a cambio, impuestos y cargos.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          Esto es un estimado con fines informativos generales, no es
          asesoría financiera ni de préstamos. Última revisión: septiembre de 2026.
        </p>
      </section>
    </div>
  );
}
