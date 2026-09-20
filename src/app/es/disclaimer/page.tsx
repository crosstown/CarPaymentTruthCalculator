import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal — Calculadora de la Verdad del Pago del Auto",
  description:
    "Esta calculadora es solo para estimados educativos -- no es asesoría financiera, legal, fiscal, ni de préstamos.",
  alternates: {
    canonical: "/es/disclaimer",
    languages: {
      "en-US": "https://carpaymenttruth.com/disclaimer",
      es: "https://carpaymenttruth.com/es/disclaimer",
    },
  },
};

export default function DisclaimerEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Aviso Legal</h1>
      <p className="mt-1 text-sm text-neutral-500">Última revisión: 14 de septiembre de 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <p>
            Esta calculadora es solo para estimados educativos. No es
            asesoría financiera, legal, fiscal, ni de préstamos. Los
            términos reales del préstamo dependen de la aprobación del
            prestamista, tu historial crediticio, el vehículo, impuestos,
            cargos, seguro y las reglas del estado -- tu oferta real puede
            diferir de lo que muestra esta herramienta.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Sin relación con prestamistas o concesionarios
          </h2>
          <p className="mt-2">
            Calculadora de la Verdad del Pago del Auto es independiente. No
            somos un prestamista, concesionario, corredor, ni institución
            financiera, y no recibimos compensación por referir préstamos.
            La calculadora no envía tu información a ningún lado -- ve la{" "}
            <Link href="/es/privacy" className="text-blue-600 underline dark:text-blue-400">
              política de privacidad
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Estimados, no cotizaciones
          </h2>
          <p className="mt-2">
            Cada cifra se calcula a partir de los números que ingresas,
            usando amortización estándar de tasa fija. Ve la{" "}
            <Link href="/es/methodology" className="text-blue-600 underline dark:text-blue-400">
              página de metodología
            </Link>{" "}
            para la fórmula exacta y lo que la calculadora no toma en cuenta
            (tasas variables, pagos globales, arrendamientos, complementos
            del concesionario, y términos de aprobación específicos del
            prestamista).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Antes de firmar
          </h2>
          <p className="mt-2">
            Confirma tu APR, plazo, cargos y costo total reales directamente
            con tu prestamista o concesionario, por escrito. Para
            orientación general sobre cómo comparar ofertas de préstamos de
            auto, ve el{" "}
            <a
              href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/"
              className="text-blue-600 underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consumer Financial Protection Bureau
            </a>{" "}
            o la{" "}
            <a
              href="https://consumer.ftc.gov/articles/financing-or-leasing-car"
              className="text-blue-600 underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Federal Trade Commission
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
