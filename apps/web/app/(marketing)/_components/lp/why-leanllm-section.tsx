type ComparisonItem = {
  other: string;
  leanllm: string;
};

const comparisons: ComparisonItem[] = [
  {
    other: 'Generic logging tools',
    leanllm: 'Built for LLM cost decisions',
  },
  {
    other: 'Dashboards you never check',
    leanllm: 'Actionable answers you act on',
  },
  {
    other: 'Observability platforms',
    leanllm: 'Cost intelligence layer',
  },
  {
    other: 'Weeks to set up',
    leanllm: 'Two minutes to first insight',
  },
];

export function WhyLeanLLMSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-20 pt-4 sm:px-8 sm:pt-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mx-auto w-fit rounded-md border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-center text-xs font-semibold tracking-[0.14em] text-[#655ccf] uppercase">
          Why LeanLLM
        </p>

        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Built for LLM cost decisions,
          <span className="ml-2 bg-linear-to-r from-[#507afe] to-[#655ccf] bg-clip-text text-transparent">
            not generic telemetry.
          </span>
        </h2>

        <div className="mt-8 space-y-3 sm:mt-10">
          {comparisons.map((item) => (
            <article
              key={item.other}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div className="grid md:grid-cols-2">
                <div className="border-b border-slate-200/80 bg-slate-50 px-4 py-4 md:border-b-0 md:border-r md:px-5">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                    Others
                  </p>
                  <p className="mt-2 text-base text-slate-500 line-through decoration-slate-400/70">
                    {item.other}
                  </p>
                </div>

                <div className="bg-linear-to-r from-[#507afe]/5 to-[#655ccf]/5 px-4 py-4 md:px-5">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-[#507afe] uppercase">
                    LeanLLM
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {item.leanllm}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
