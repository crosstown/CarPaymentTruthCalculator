import type { Metadata } from "next";
import Link from "next/link";
import SeventyTwoVsEightyFourCalculator from "@/components/SeventyTwoVsEightyFourCalculator";

export const metadata: Metadata = {
  title: "Préstamo de Auto 72 vs 84 Meses: Calculadora de Costo Real",
  description:
    "¿Es malo un préstamo de auto de 84 meses? Compara el pago mensual real, el interés total y el costo total real de un préstamo de 72 vs 84 meses.",
  alternates: {
    canonical: "/es/72-vs-84-month-car-loan",
    languages: {
      "en-US": "https://carpaymenttruth.com/72-vs-84-month-car-loan",
      es: "https://carpaymenttruth.com/es/72-vs-84-month-car-loan",
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
      name: "Préstamo 72 vs 84 Meses",
      item: "https://carpaymenttruth.com/es/72-vs-84-month-car-loan",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "¿Es malo un préstamo de auto de 84 meses?",
    a: "No automáticamente -- pero es caro. Un préstamo de 84 meses baja tu pago mensual comparado con uno de 72 meses en el mismo auto, pero pagas intereses un año entero más sobre un saldo que baja más lento, así que el interés total es notablemente más alto. También aumenta el riesgo de quedar \"underwater\" (deber más de lo que vale el auto) por más tiempo, ya que los autos se deprecian más rápido de lo que un préstamo largo reduce el capital.",
  },
  {
    q: "¿Cuánto más cuesta un préstamo de 84 meses que uno de 72 meses?",
    a: "Depende del monto del préstamo y el APR, pero el patrón es constante: el pago mensual baja y el interés total pagado sube, siempre. Usa la calculadora de arriba con tus propios números para ver la diferencia exacta en tu préstamo.",
  },
  {
    q: "¿Por qué los préstamos más largos a veces tienen un APR más alto?",
    a: "Los prestamistas ven los plazos largos como más riesgosos -- más tiempo para que algo salga mal -- así que los préstamos de 84 meses a veces tienen un APR más alto que el mismo prestamista ofrecería en uno de 60 o 72 meses. Eso se suma a los meses extra de interés, haciendo la brecha en costo real aún más grande de lo que sugeriría solo la diferencia de plazo.",
  },
  {
    q: "¿Cuándo puede tener sentido un préstamo de 84 meses?",
    a: "Si el pago más bajo es genuinamente necesario para tu presupuesto, y planeas quedarte con el auto todo el plazo del préstamo (o más), un préstamo de 84 meses puede ser una compensación razonable -- siempre que entres sabiendo el costo total de interés, no solo el pago.",
  },
  {
    q: "¿Cuál es el riesgo de quedar \"underwater\" en un préstamo de auto largo?",
    a: "Los autos pierden valor rápido en los primeros años, a menudo más rápido de lo que un préstamo de 72 u 84 meses reduce el capital. Si debes más de lo que vale el auto y necesitas venderlo o darlo a cambio, la diferencia (capital negativo) normalmente se incluye en tu próximo préstamo -- ve la calculadora en la página principal para ver cómo se modela esto.",
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

export default function SeventyTwoVsEightyFourPageEs() {
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
        Préstamo de Auto: 72 vs 84 Meses
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        El año extra en un préstamo de 84 meses baja tu pago, pero no baja lo
        que realmente cuesta el auto -- lo sube. Ingresa tus números abajo
        para ver exactamente cuánto difieren un préstamo de 72 meses y uno
        de 84 meses, en el mismo auto.
      </p>

      <div className="mt-8">
        <SeventyTwoVsEightyFourCalculator locale="es" />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Por qué los 12 meses extra cuestan más de lo que parece
        </h2>
        <p className="mt-2">
          Los préstamos de auto cargan más intereses al principio: los
          primeros pagos son mayormente interés, los últimos mayormente
          capital. Agregar 12 meses a un préstamo no solo reparte el mismo
          interés sobre más pagos -- agrega 12 meses más de cargos de
          interés sobre un saldo que sigue relativamente alto, porque el
          préstamo más corto ya habría reducido una parte para entonces. Por
          eso la brecha en interés total entre 72 y 84 meses es
          consistentemente más grande de lo que sugeriría un simple aumento
          de 12/72 = 17%.
        </p>

        <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Ejemplo práctico
        </h2>
        <p className="mt-2">$34,950 financiados al 7.5% de APR:</p>
        <ul className="mt-1 list-inside list-disc space-y-0.5">
          <li>72 meses: $604.29/mes, $8,559 de interés total</li>
          <li>84 meses: $536.07/mes, $10,080 de interés total</li>
        </ul>
        <p className="mt-1">
          El pago baja cerca de $68/mes, pero eso cuesta $1,521 extra en
          interés durante la vida del préstamo -- aproximadamente $127 por
          cada $1 de alivio en el pago mensual, repartido en los 12 meses
          extra.
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
          — calculadora completa con auto a cambio, impuestos, cargos, y
          todos los plazos comunes de 36 a 84 meses.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          Esto es un estimado con fines informativos generales, no es
          asesoría financiera ni de préstamos. Última revisión: septiembre de 2026.
        </p>
      </section>
    </div>
  );
}
