import Link from "next/link";
import type { Locale } from "./Calculator";

const STRINGS = {
  en: {
    heading: "Why the monthly payment isn't the real price",
    p1: "Dealers sell payments, not prices, because a monthly number can always be made to look affordable -- stretch the loan term long enough and almost any car fits almost any budget. The catch is that the payment only tells you what leaves your account each month. It says nothing about how much of that payment is interest, how much total interest you'll pay before the loan is done, or what the car actually costs once tax, fees, and financing are added up.",
    p2: "Three things drive that real total, and only one of them is the price tag:",
    liTermLabel: "Loan term.",
    liTerm:
      "Going from a 60-month loan to an 84-month loan lowers the monthly payment, but it also means paying interest for two extra years on a balance that's barely gone down -- auto loans are front-loaded with interest, so a longer term doesn't just delay the principal, it substantially grows the total interest paid.",
    liAprLabel: "APR.",
    liApr:
      "Your rate depends on credit score, lender, and loan term (longer terms often carry higher rates too) -- a few points of APR difference compounds into thousands of dollars over a 5-7 year loan.",
    liFeesLabel: "Tax and fees.",
    liFees:
      "Sales tax (charged on the vehicle price, usually net of any trade-in) plus documentation, registration, and dealer fees often add thousands before financing even starts -- and if they're rolled into the loan rather than paid at signing, you pay interest on them too.",
    p3: "This calculator runs the same loan across every common term length side by side, so you can see the actual trade-off: a smaller monthly number now against a larger total cost over the life of the loan.",
    faqHeading: "Frequently asked questions",
    faqs: [
      {
        q: "Why does a longer loan term cost more overall?",
        a: "Interest accrues on whatever principal is still outstanding. Stretching the same loan amount over more months means more months of interest charges on a balance that's paying down more slowly -- the total interest paid grows even though each individual payment shrinks.",
      },
      {
        q: "Does trade-in value actually reduce sales tax?",
        a: "In most states, yes -- you're taxed on the price minus your trade-in, not the full price. A handful of states, notably California, tax the full vehicle price regardless of trade-in. Check your state's DMV rules for the specifics.",
      },
      {
        q: "Should I roll tax and fees into the loan?",
        a: "Rolling them in keeps more cash in your pocket at signing, but you'll pay interest on that amount for the life of the loan. Paying them upfront costs more today but less overall -- toggle the option above to see the difference for your numbers.",
      },
      {
        q: "Is this financial advice?",
        a: "No. Figures here are estimates for general informational purposes only, based on standard auto-loan amortization and rates/fees you enter yourself. For your specific situation, talk to your lender or a licensed financial advisor.",
      },
    ],
    toolsHeading: "More tools",
    tools: [
      { href: "/72-vs-84-month-car-loan", label: "72 vs 84 month car loan", desc: "is the lower payment on a longer loan actually worth it?" },
      { href: "/out-the-door-price-calculator", label: "Out-the-door price calculator", desc: "the real total before financing even enters the picture." },
      { href: "/dealer-add-on-cost-calculator", label: "Dealer add-on cost calculator", desc: "what an extended warranty or GAP coverage really costs, financed." },
      { href: "/compare-auto-loan-offers", label: "Compare auto loan offers", desc: "dealer vs. credit union vs. bank, by total cost, not just payment." },
      { href: "/auto-refinance-savings-calculator", label: "Auto refinance savings calculator", desc: "see if refinancing your current loan actually saves you money." },
    ],
  },
  es: {
    heading: "Por qué el pago mensual no es el precio real",
    p1: "Los concesionarios venden pagos, no precios, porque un número mensual siempre se puede hacer ver accesible -- estira el plazo del préstamo lo suficiente y casi cualquier auto cabe en casi cualquier presupuesto. El problema es que el pago solo te dice cuánto sale de tu cuenta cada mes. No dice nada sobre cuánto de ese pago es interés, cuánto interés total pagarás antes de terminar el préstamo, o cuánto cuesta realmente el auto una vez que se suman impuestos, cargos y financiamiento.",
    p2: "Tres cosas determinan ese costo real, y solo una de ellas es el precio en la etiqueta:",
    liTermLabel: "El plazo del préstamo.",
    liTerm:
      "Pasar de un préstamo de 60 meses a uno de 84 meses baja el pago mensual, pero también significa pagar intereses dos años más sobre un saldo que apenas ha bajado -- los préstamos de auto cargan más intereses al principio, así que un plazo más largo no solo retrasa el capital, aumenta sustancialmente el interés total pagado.",
    liAprLabel: "El APR.",
    liApr:
      "Tu tasa depende de tu historial crediticio, el prestamista y el plazo del préstamo (los plazos más largos a menudo también tienen tasas más altas) -- unos pocos puntos de diferencia en el APR se acumulan en miles de dólares durante un préstamo de 5 a 7 años.",
    liFeesLabel: "Impuestos y cargos.",
    liFees:
      "El impuesto sobre venta (cobrado sobre el precio del vehículo, normalmente neto de cualquier auto a cambio) más los cargos de trámites, registro y del concesionario a menudo suman miles antes de que empiece el financiamiento -- y si se incluyen en el préstamo en vez de pagarse al firmar, también pagas intereses sobre ellos.",
    p3: "Esta calculadora corre el mismo préstamo en cada plazo común, lado a lado, para que veas la verdadera disyuntiva: un número mensual más pequeño ahora contra un costo total más grande durante la vida del préstamo.",
    faqHeading: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Por qué un plazo de préstamo más largo cuesta más en total?",
        a: "El interés se acumula sobre el capital que todavía queda pendiente. Estirar el mismo monto de préstamo sobre más meses significa más meses de cargos de interés sobre un saldo que baja más lento -- el interés total pagado crece aunque cada pago individual se reduzca.",
      },
      {
        q: "¿El valor del auto a cambio realmente reduce el impuesto sobre venta?",
        a: "En la mayoría de los estados, sí -- te gravan sobre el precio menos tu auto a cambio, no el precio completo. Algunos estados, especialmente California, gravan el precio completo del vehículo sin importar el auto a cambio. Revisa las reglas del DMV de tu estado para más detalles.",
      },
      {
        q: "¿Debería incluir impuestos y cargos en el préstamo?",
        a: "Incluirlos te deja más efectivo al firmar, pero pagarás intereses sobre ese monto durante toda la vida del préstamo. Pagarlos por adelantado cuesta más hoy pero menos en total -- cambia la opción arriba para ver la diferencia con tus números.",
      },
      {
        q: "¿Esto es asesoría financiera?",
        a: "No. Las cifras aquí son estimados con fines informativos generales, basados en amortización estándar de préstamos de auto y las tasas/cargos que tú ingreses. Para tu situación específica, habla con tu prestamista o un asesor financiero con licencia.",
      },
    ],
    toolsHeading: "Más herramientas",
    tools: [
      { href: "/es/72-vs-84-month-car-loan", label: "Préstamo de auto: 72 vs 84 meses", desc: "¿realmente vale la pena el pago más bajo de un préstamo más largo?" },
      { href: "/es/out-the-door-price-calculator", label: "Calculadora de precio total ('out-the-door')", desc: "el total real antes de que entre el financiamiento." },
      { href: "/es/dealer-add-on-cost-calculator", label: "Calculadora de costo de complementos del concesionario", desc: "lo que realmente cuesta una garantía extendida o cobertura GAP, financiada." },
      { href: "/es/compare-auto-loan-offers", label: "Comparar ofertas de préstamos de auto", desc: "concesionario vs. cooperativa de crédito vs. banco, por costo total, no solo el pago." },
      { href: "/es/auto-refinance-savings-calculator", label: "Calculadora de ahorro al refinanciar", desc: "ve si refinanciar tu préstamo actual realmente te ahorra dinero." },
    ],
  },
} as const;

export default function CarPaymentExplainer({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-16 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t.heading}
      </h2>
      <p className="mt-3">{t.p1}</p>
      <p className="mt-3">{t.p2}</p>
      <ul className="mt-3 list-inside list-disc space-y-2">
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">{t.liTermLabel}</strong> {t.liTerm}
        </li>
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">{t.liAprLabel}</strong> {t.liApr}
        </li>
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">{t.liFeesLabel}</strong> {t.liFees}
        </li>
      </ul>
      <p className="mt-3">{t.p3}</p>

      <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t.faqHeading}
      </h2>
      <div className="mt-3 space-y-4">
        {t.faqs.map(({ q, a }) => (
          <div key={q}>
            <p className="font-medium text-neutral-800 dark:text-neutral-200">{q}</p>
            <p className="mt-1">{a}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t.toolsHeading}
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-1.5">
        {t.tools.map(({ href, label, desc }) => (
          <li key={href}>
            <Link href={href} className="text-blue-600 underline dark:text-blue-400">
              {label}
            </Link>{" "}
            — {desc}
          </li>
        ))}
      </ul>
    </section>
  );
}
