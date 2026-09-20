import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de — Calculadora de la Verdad del Pago del Auto",
  description:
    "Quién hizo la Calculadora de la Verdad del Pago del Auto y por qué -- una herramienta independiente, sostenida por publicidad, para ver el costo real de un préstamo de auto.",
  alternates: {
    canonical: "/es/about",
    languages: {
      "en-US": "https://carpaymenttruth.com/about",
      es: "https://carpaymenttruth.com/es/about",
    },
  },
};

export default function AboutEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Acerca de</h1>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <p>
            Calculadora de la Verdad del Pago del Auto es una herramienta
            gratuita e independiente construida alrededor de una idea: el
            pago mensual que te cotiza un concesionario no es el precio del
            auto. Un plazo de préstamo más largo puede hacer que casi
            cualquier vehículo se vea accesible mes a mes mientras
            silenciosamente agrega miles de dólares extra en interés durante
            la vida del préstamo. Esta calculadora existe para hacer visible
            esa compensación antes de que firmes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Qué es
          </h2>
          <p className="mt-2">
            Una calculadora basada en el navegador que toma los números que
            te da un concesionario o prestamista -- precio, enganche, auto a
            cambio, APR, impuesto, cargos y plazo -- y muestra el monto
            financiado, el interés total, y el costo total real, incluyendo
            una comparación lado a lado en cada plazo común de préstamo (36
            a 84 meses). Ve la{" "}
            <Link href="/es/methodology" className="text-blue-600 underline dark:text-blue-400">
              página de metodología
            </Link>{" "}
            para la fórmula exacta y los supuestos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Qué no es
          </h2>
          <p className="mt-2">
            Este sitio no es un prestamista, concesionario, corredor, ni
            asesor financiero, y no vende contactos a ninguno. No requiere
            una cuenta, no recopila los números que ingresas, y no hace
            ofertas de préstamo. Es una calculadora, no asesoría financiera
            -- ve el{" "}
            <Link href="/es/disclaimer" className="text-blue-600 underline dark:text-blue-400">
              aviso legal
            </Link>{" "}
            para más detalles.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Cómo se financia
          </h2>
          <p className="mt-2">
            El sitio es gratis de usar y se sostiene con publicidad de
            Google AdSense, no con comisiones de referidos de prestamistas.
            Ve la{" "}
            <Link href="/es/privacy" className="text-blue-600 underline dark:text-blue-400">
              política de privacidad
            </Link>{" "}
            para saber cómo funcionan las cookies publicitarias aquí.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            ¿Preguntas o comentarios?
          </h2>
          <p className="mt-2">
            Ponte en contacto en la{" "}
            <Link href="/es/contact" className="text-blue-600 underline dark:text-blue-400">
              página de contacto
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
