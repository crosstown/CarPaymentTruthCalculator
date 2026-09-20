import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — Calculadora de la Verdad del Pago del Auto",
  description: "Cómo carpaymenttruth.com maneja tus datos y usa cookies publicitarias.",
  alternates: {
    canonical: "/es/privacy",
    languages: {
      "en-US": "https://carpaymenttruth.com/privacy",
      es: "https://carpaymenttruth.com/es/privacy",
    },
  },
};

export default function PrivacyPolicyEs() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <Link href="/es" className="text-sm text-neutral-500 hover:underline">
        ← Volver a la calculadora
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Política de Privacidad</h1>
      <p className="mt-1 text-sm text-neutral-500">Última actualización: 1 de septiembre de 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Resumen
          </h2>
          <p className="mt-2">
            Calculadora de la Verdad del Pago del Auto (carpaymenttruth.com)
            es una herramienta gratuita para estimar el costo real de un
            préstamo de auto. Esta política explica qué pasa con tus datos
            cuando la usas.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            La calculadora en sí no recopila tus datos
          </h2>
          <p className="mt-2">
            No hay cuentas, no hay registro, y no hay servidor detrás de la
            calculadora. El precio, enganche, tasa y otros números que
            ingresas se procesan completamente en tu propio navegador para
            calcular los resultados que ves en pantalla. Esa información
            nunca se nos envía, ni la almacenamos, ni la vemos de ninguna
            forma.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Publicidad y cookies (Google AdSense)
          </h2>
          <p className="mt-2">
            Este sitio muestra anuncios a través de Google AdSense. Google y
            sus socios publicitarios pueden usar cookies, identificadores de
            dispositivo, o tecnologías similares para mostrar anuncios
            basados en tus visitas a este y otros sitios web, y para medir
            el desempeño de los anuncios. No controlamos esta recopilación
            de datos directamente -- se rige por las propias políticas de
            Google:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo usa Google la información de los sitios que usan sus servicios
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de Google
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Si estás en el EEE, el Reino Unido, o Suiza
          </h2>
          <p className="mt-2">
            A los visitantes del Espacio Económico Europeo, el Reino Unido y
            Suiza se les muestra un aviso de consentimiento antes de que se
            activen cookies publicitarias, para que puedas aceptar,
            rechazar, o administrar preferencias detalladas. Puedes cambiar
            tu elección en cualquier momento borrando las cookies de tu
            navegador para este sitio, lo que mostrará el aviso de nuevo en
            tu próxima visita.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Tus opciones
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              Desactiva la publicidad personalizada de Google en{" "}
              <a
                href="https://adssettings.google.com"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Configuración de Anuncios de Google
              </a>
              .
            </li>
            <li>
              Desactiva la publicidad personalizada de muchas redes
              publicitarias externas en{" "}
              <a
                href="https://optout.aboutads.info"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info
              </a>
              .
            </li>
            <li>
              Bloquea o borra cookies en cualquier momento a través de la
              configuración de tu propio navegador.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Privacidad de menores
          </h2>
          <p className="mt-2">
            Este sitio no está dirigido a menores de 13 años, y no
            recopilamos a sabiendas información personal de menores.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Cambios a esta política
          </h2>
          <p className="mt-2">
            Podemos actualizar esta política de vez en cuando. Los cambios
            se publicarán en esta página con una fecha de &quot;última
            actualización&quot; renovada.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Contacto
          </h2>
          <p className="mt-2">
            ¿Preguntas sobre esta política? Escribe a{" "}
            <a
              href="mailto:royalplanet2009@gmail.com"
              className="text-blue-600 underline dark:text-blue-400"
            >
              royalplanet2009@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
