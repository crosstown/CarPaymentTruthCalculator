import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import CarPaymentExplainer from "@/components/CarPaymentExplainer";

export const metadata: Metadata = {
  title: "Calculadora de la Verdad del Pago del Auto",
  description:
    "Mira el costo real de un préstamo de auto -- interés total, cargos, y cómo el plazo del préstamo cambia lo que realmente pagas, no solo el pago mensual. Gratis, sin registro.",
  alternates: {
    canonical: "/es",
    languages: { "en-US": "https://carpaymenttruth.com/", es: "https://carpaymenttruth.com/es" },
  },
};

export default function HomeEs() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-950">
      <Calculator locale="es" />
      <CarPaymentExplainer locale="es" />
    </div>
  );
}
