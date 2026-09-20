import type { Metadata } from "next";
import Link from "next/link";
import AddOnCostCalculator from "@/components/AddOnCostCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Costo de Complementos del Concesionario",
  description:
    "Mira el costo real de incluir un complemento del concesionario -- garantía extendida, GAP, protección de pintura -- en tu préstamo de auto, incluyendo el interés que agrega.",
  alternates: {
    canonical: "/es/dealer-add-on-cost-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/dealer-add-on-cost-calculator",
      es: "https://carpaymenttruth.com/es/dealer-add-on-cost-calculator",
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
      name: "Costo de Complementos del Concesionario",
      item: "https://carpaymenttruth.com/es/dealer-add-on-cost-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "¿Por qué un complemento del concesionario cuesta más que su precio de lista?",
    a: "Si lo incluyes en tu préstamo de auto en vez de pagarlo en efectivo, lo estás financiando al mismo APR que el vehículo, por el mismo plazo. Eso significa que pagas interés sobre el precio del complemento durante años, además del precio en sí -- la calculadora de arriba muestra exactamente cuánto.",
  },
  {
    q: "¿Vale la pena el seguro GAP?",
    a: "La cobertura GAP paga la diferencia entre el saldo de tu préstamo y el valor de tu auto si se pierde totalmente o te lo roban mientras debes más de lo que vale -- genuinamente útil si diste un enganche pequeño o tienes un plazo largo, ya que ambos aumentan las probabilidades de quedar \"underwater\". Si vale la pena el precio depende de la cotización y qué tan probable sea que lo necesites; algunas aseguradoras de auto ofrecen cobertura similar por menos que el GAP del concesionario.",
  },
  {
    q: "¿Debería pagar los complementos en efectivo en vez de financiarlos?",
    a: "Si puedes, sí -- pagar en efectivo evita el costo de interés por completo. Si financiarlo es la única opción, al menos conoce el costo real (precio más interés) antes de decidir si el complemento vale la pena, no solo cuánto sube el pago mensual.",
  },
  {
    q: "¿Puedo negociar los precios de los complementos del concesionario?",
    a: "A menudo, sí. Complementos como protección de pintura, protección de tela y grabado de VIN frecuentemente tienen márgenes altos y se pueden negociar a la baja o rechazar por completo. Las garantías extendidas y la cobertura GAP a veces se pueden comprar después, o con un tercero, por menos que el precio del concesionario.",
  },
  {
    q: "¿Tengo que comprar complementos para obtener financiamiento?",
    a: "No. Los complementos del concesionario son opcionales. Bajo las reglas de la FTC, los prestamistas no pueden exigir que compres productos complementarios como condición para el financiamiento (aunque un paquete o tasa promocional puede anunciarse junto con ellos) -- tienes derecho a rechazar cualquier complemento y aún así obtener el préstamo.",
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

export default function DealerAddOnCostCalculatorPageEs() {
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
        Calculadora de Costo de Complementos del Concesionario
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Una garantía extendida o cobertura GAP no solo agrega su precio a tu
        préstamo -- si la financias, también pagas interés sobre ella,
        durante todo el plazo del préstamo. Mira lo que realmente cuesta un
        complemento del concesionario una vez incluido.
      </p>

      <div className="mt-8">
        <AddOnCostCalculator locale="es" />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Complementos comunes del concesionario
        </h2>
        <p className="mt-2">
          Garantía extendida / contrato de servicio, cobertura GAP,
          protección de pintura y tela, paquetes de llantas y rines, grabado
          de VIN, y paquetes antirrobo son los complementos más comunes que
          se ofrecen al firmar. Cada uno sube tu monto financiado si se
          incluye en el préstamo -- y el interés aplica sobre ese monto más
          alto durante todo el plazo del préstamo, según la{" "}
          <Link href="/es/methodology" className="text-blue-600 underline dark:text-blue-400">
            misma matemática de amortización
          </Link>{" "}
          usada para el vehículo en sí.
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
          — ve tu pago de préstamo completo y costo total, complementos incluidos.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          Esto es un estimado con fines informativos generales, no es
          asesoría financiera, legal ni de seguros. Última revisión: septiembre de 2026.
        </p>
      </section>
    </div>
  );
}
