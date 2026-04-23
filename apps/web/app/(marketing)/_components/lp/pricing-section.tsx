import { PricingTable } from "@kit/billing-gateway/marketing";
import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';

export function PricingSection() {
  return (
    <section className="overflow-x-clip bg-linear-to-b from-[#f8f9ff] via-white to-[#f9f7ff] md:mx-6 md:rounded-4xl">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mx-auto w-fit rounded-md border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#655ccf] uppercase">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Choose the plan that fits your team.
          </h2>
        </div>

        <PricingTable
          config={billingConfig}
          paths={{
            signUp: pathsConfig.auth.signUp,
            return: pathsConfig.app.home,
          }}
        />
      </div>
    </section>
  );
}
