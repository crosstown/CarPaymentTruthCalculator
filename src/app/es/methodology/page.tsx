import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Metodología — Calculadora de la Verdad del Pago del Auto",
  description:
    "Cómo la Calculadora de la Verdad del Pago del Auto calcula tu pago mensual y costo total real -- la fórmula, los supuestos, y lo que no modela.",
  alternates: {
    canonical: "/es/methodology",
    languages: {
      "en-US": "https://carpaymenttruth.com/methodology",
      es: "https://carpaymenttruth.com/es/methodology",
    },
  },
};

export default function MethodologyEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Metodología</h1>
      <p className="mt-1 text-sm text-neutral-500">Última revisión: 14 de septiembre de 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Fórmula del pago mensual
          </h2>
          <p className="mt-2">
            La calculadora usa la fórmula estándar de amortización de tasa
            fija para un pago mensual nivelado M sobre el capital P, a una
            tasa de interés mensual r, durante n meses:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-neutral-100 p-3 text-xs dark:bg-neutral-900">
            M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)
          </pre>
          <p className="mt-2">
            r es tu tasa de interés anual (APR) dividida entre 12. Si el APR
            es 0% (un préstamo promocional o sin intereses), el pago es
            simplemente el capital dividido entre el plazo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Qué cuenta como &quot;monto financiado&quot;
          </h2>
          <p className="mt-2">
            Monto financiado = precio del vehículo − valor del auto a cambio
            − enganche, más impuesto sobre venta y cargos si eliges
            incluirlos en el préstamo (la opción por defecto). Si desmarcas
            &quot;incluir impuestos y cargos en el préstamo&quot;, se suman
            a tu efectivo debido al firmar en vez de incluirse en el capital
            financiado -- lo que significa que no pagas interés sobre ellos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Cómo se maneja el impuesto sobre venta
          </h2>
          <p className="mt-2">
            La calculadora asume el caso común: el impuesto sobre venta se
            cobra sobre el precio del vehículo <em>neto del valor del auto a
            cambio</em> (un &quot;crédito fiscal por auto a cambio&quot;),
            usando la tasa combinada estatal + local que ingreses. Algunos
            estados -- especialmente California -- gravan el precio completo
            del vehículo sin importar el auto a cambio, así que el estimado
            podría sobreestimar tu impuesto real ahí. Siempre confirma la
            regla de tu estado antes de confiar en el número.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Cómo funciona el estimado de seguro
          </h2>
          <p className="mt-2">
            El campo de seguro es únicamente opcional -- la calculadora
            nunca genera ni asume una cifra de seguro por su cuenta.
            Cualquier cosa que ingreses simplemente se multiplica por el
            plazo del préstamo y se suma al &quot;costo total real&quot;.
            Déjalo en blanco si aún no tienes una cotización; el resto de
            los números seguirán siendo precisos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Qué no modela esta calculadora
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Préstamos de tasa variable o escalonada (se asume que el APR es fijo durante todo el plazo)</li>
            <li>Pagos globales (&quot;balloon&quot;)</li>
            <li>Arrendamientos</li>
            <li>
              Complementos del concesionario (garantía extendida, GAP,
              protección de pintura, etc.) más allá del campo fijo de
              &quot;cargos&quot; -- ve la{" "}
              <Link href="/es/dealer-add-on-cost-calculator" className="text-blue-600 underline dark:text-blue-400">
                calculadora de costo de complementos del concesionario
              </Link>{" "}
              para eso específicamente
            </li>
            <li>Aprobación específica del prestamista, precios por nivel de crédito, o tasas promocionales</li>
          </ul>
          <p className="mt-2 text-xs text-neutral-500">
            El capital negativo trasladado de un préstamo de auto a cambio
            (el campo &quot;saldo pendiente del auto a cambio&quot;) SÍ se
            modela -- se incluye en el monto financiado según el manejo del
            auto a cambio descrito arriba.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Fuentes
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFPB — ¿Qué es la amortización y cómo puede afectar mi préstamo de auto?
              </a>
            </li>
            <li>
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFPB — ¿Cómo comparo ofertas de préstamos de auto?
              </a>
            </li>
            <li>
              <a
                href="https://consumer.ftc.gov/articles/financing-or-leasing-car"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                FTC — Financiar o Arrendar un Auto
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            ¿Preguntas sobre los cálculos?
          </h2>
          <p className="mt-2">
            Escribe a{" "}
            <a
              href="mailto:royalplanet2009@gmail.com"
              className="text-blue-600 underline dark:text-blue-400"
            >
              royalplanet2009@gmail.com
            </a>{" "}
            o ve el{" "}
            <Link href="/es/disclaimer" className="text-blue-600 underline dark:text-blue-400">
              aviso legal
            </Link>{" "}
            para los límites de la calculadora.
          </p>
        </section>
      </div>
    </div>
  );
}
