import Calculator from "@/components/Calculator";
import CarPaymentExplainer from "@/components/CarPaymentExplainer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-950">
      <Calculator />
      <CarPaymentExplainer />
    </div>
  );
}
