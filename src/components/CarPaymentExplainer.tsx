export default function CarPaymentExplainer() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-16 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Why the monthly payment isn&apos;t the real price
      </h2>
      <p className="mt-3">
        Dealers sell payments, not prices, because a monthly number can
        always be made to look affordable -- stretch the loan term long
        enough and almost any car fits almost any budget. The catch is that
        the payment only tells you what leaves your account each month. It
        says nothing about how much of that payment is interest, how much
        total interest you&apos;ll pay before the loan is done, or what the
        car actually costs once tax, fees, and financing are added up.
      </p>
      <p className="mt-3">
        Three things drive that real total, and only one of them is the
        price tag:
      </p>
      <ul className="mt-3 list-inside list-disc space-y-2">
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">
            Loan term.
          </strong>{" "}
          Going from a 60-month loan to an 84-month loan lowers the monthly
          payment, but it also means paying interest for two extra years on
          a balance that&apos;s barely gone down -- auto loans are front-loaded
          with interest, so a longer term doesn&apos;t just delay the
          principal, it substantially grows the total interest paid.
        </li>
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">
            APR.
          </strong>{" "}
          Your rate depends on credit score, lender, and loan term (longer
          terms often carry higher rates too) -- a few points of APR
          difference compounds into thousands of dollars over a 5-7 year
          loan.
        </li>
        <li>
          <strong className="text-neutral-800 dark:text-neutral-200">
            Tax and fees.
          </strong>{" "}
          Sales tax (charged on the vehicle price, usually net of any
          trade-in) plus documentation, registration, and dealer fees often
          add thousands before financing even starts -- and if they&apos;re
          rolled into the loan rather than paid at signing, you pay interest
          on them too.
        </li>
      </ul>
      <p className="mt-3">
        This calculator runs the same loan across every common term length
        side by side, so you can see the actual trade-off: a smaller monthly
        number now against a larger total cost over the life of the loan.
      </p>

      <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Frequently asked questions
      </h2>
      <div className="mt-3 space-y-4">
        <div>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            Why does a longer loan term cost more overall?
          </p>
          <p className="mt-1">
            Interest accrues on whatever principal is still outstanding.
            Stretching the same loan amount over more months means more
            months of interest charges on a balance that&apos;s paying down
            more slowly -- the total interest paid grows even though each
            individual payment shrinks.
          </p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            Does trade-in value actually reduce sales tax?
          </p>
          <p className="mt-1">
            In most states, yes -- you&apos;re taxed on the price minus your
            trade-in, not the full price. A handful of states, notably
            California, tax the full vehicle price regardless of trade-in.
            Check your state&apos;s DMV rules for the specifics.
          </p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            Should I roll tax and fees into the loan?
          </p>
          <p className="mt-1">
            Rolling them in keeps more cash in your pocket at signing, but
            you&apos;ll pay interest on that amount for the life of the
            loan. Paying them upfront costs more today but less overall --
            toggle the option above to see the difference for your numbers.
          </p>
        </div>
        <div>
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            Is this financial advice?
          </p>
          <p className="mt-1">
            No. Figures here are estimates for general informational
            purposes only, based on standard auto-loan amortization and
            rates/fees you enter yourself. For your specific situation,
            talk to your lender or a licensed financial advisor.
          </p>
        </div>
      </div>
    </section>
  );
}
