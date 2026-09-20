import type { Metadata } from "next";
import Link from "next/link";
import OutTheDoorCalculator from "@/components/OutTheDoorCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Precio Total del Auto | Con Impuestos, Cargos y Descuentos",
  description:
    "Calcula el precio total real de un auto: precio del vehículo, impuesto sobre venta, cargos de trámites, registro, auto a cambio y descuentos -- el total antes de cualquier préstamo.",
  alternates: {
    canonical: "/es/out-the-door-price-calculator",
    languages: {
      "en-US": "https://carpaymenttruth.com/out-the-door-price-calculator",
      es: "https://carpaymenttruth.com/es/out-the-door-price-calculator",
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
      name: "Calculadora de Precio Total",
      item: "https://carpaymenttruth.com/es/out-the-door-price-calculator",
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: "¿Qué es el precio total (\"out-the-door\") de un auto?",
    a: "El monto total que realmente pagas para llevarte el auto: el precio negociado del vehículo, menos cualquier valor de auto a cambio y descuentos, más el impuesto sobre venta y todos los cargos del concesionario/DMV. Es el precio real de la transacción, separado de cómo (o si) lo financias.",
  },
  {
    q: "¿Por qué el precio total es diferente al precio de etiqueta?",
    a: "El precio de etiqueta es solo el vehículo. El impuesto sobre venta, cargos de trámites, registro y otros cargos se suman -- y aunque un descuento baja lo que pagas, la mayoría de los estados igual gravan el precio antes del descuento, así que el impuesto no baja junto con él.",
  },
  {
    q: "¿El auto a cambio reduce el impuesto sobre venta?",
    a: "En la mayoría de los estados, sí -- te gravan sobre el precio menos tu auto a cambio, no el precio completo. Algunos estados (especialmente California) gravan el precio completo del vehículo sin importar el auto a cambio. Revisa las reglas del DMV de tu estado.",
  },
  {
    q: "¿Un descuento del fabricante también reduce el impuesto sobre venta?",
    a: "Usualmente no. La mayoría de los estados tratan un descuento del fabricante como una reducción de precio del fabricante al concesionario, no un descuento que negoció el comprador, así que el impuesto sobre venta normalmente se calcula sobre el precio antes del descuento aunque el descuento reduzca lo que realmente pagas.",
  },
  {
    q: "¿Qué cargos debo esperar además del impuesto?",
    a: "Un cargo de trámites (\"doc fee\") para procesar el papeleo, cargos de registro/título al estado, y a veces cargos menores como transferencia de placas. Estos varían mucho según el estado y el concesionario -- pide un desglose detallado antes de firmar.",
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

export default function OutTheDoorPriceCalculatorPageEs() {
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
        Calculadora de Precio Total (&quot;Out-the-Door&quot;)
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        El número en la etiqueta de la ventana no es lo que realmente
        pagarás. Impuestos, cargos, tu auto a cambio y cualquier descuento
        cambian el total real -- antes de que el financiamiento entre en
        juego. Ingresa tus números abajo para ver el precio total real.
      </p>

      <div className="mt-8">
        <OutTheDoorCalculator locale="es" />
      </div>

      <section className="mt-12 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Precio total vs. precio financiado
        </h2>
        <p className="mt-2">
          Este es el precio del auto en sí -- es el número que pagarías en
          efectivo. Si estás financiando, el monto financiado (y lo que
          realmente cuesta una vez que se agrega el interés durante el
          plazo del préstamo) es una pregunta aparte. Ve la{" "}
          <Link href="/es" className="text-blue-600 underline dark:text-blue-400">
            calculadora completa de préstamo
          </Link>{" "}
          para el total financiado.
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
          — ve el pago mensual y el interés total si financias esta compra.
        </p>

        <p className="mt-4 text-xs text-neutral-400">
          Esto es un estimado con fines informativos generales, no es
          asesoría financiera ni legal. Última revisión: septiembre de 2026.
        </p>
      </section>
    </div>
  );
}
