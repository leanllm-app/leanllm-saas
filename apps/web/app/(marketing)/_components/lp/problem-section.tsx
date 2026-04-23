import { RevealItem, StaggerReveal } from './scroll-reveal';

type ProblemStat = {
  value: string;
  title: string;
};

const stats: ProblemStat[] = [
  {
    value: '10%',
    title: 'Power users drive spend',
  },
  {
    value: '3x',
    title: 'Costs inflated by retries',
  },
  {
    value: '70%',
    title: 'Budget hidden in one flow',
  },
];

export function ProblemSection() {
  return (
    <section className="overflow-x-clip">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pr-2">
            <p className="w-fit rounded-full border border-[#507afe]/20 bg-[#507afe]/8 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#507afe] uppercase">
              The Problem
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              You&apos;re flying blind with LLM costs.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Your OpenAI bill went up 40% last month. You don&apos;t know why.
              Nobody does. That&apos;s the problem.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-3xl border border-[#507afe]/15 bg-linear-to-br from-[#eef3ff] via-[#ece9ff] to-[#e6f6ff] p-4 shadow-[0_40px_80px_-44px_rgba(80,122,254,0.7)] sm:rounded-4xl sm:p-9">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(80,122,254,0.2),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(101,92,207,0.2),transparent_45%)]" />
              <div className="relative h-[220px] sm:h-[270px]" />
            </div>

            <StaggerReveal
              className="absolute left-1/2 top-1/2 flex w-[88%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-2 sm:w-[430px] sm:max-w-none sm:gap-3"
              delayChildren={0.12}
            >
              {stats.map((item, index) => (
                <RevealItem
                  key={`${item.value}-${item.title}`}
                  className={`inline-flex w-fit max-w-full items-center gap-2.5 rounded-xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-[0_16px_28px_-24px_rgba(30,41,59,0.42)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 sm:gap-3 sm:rounded-lg sm:px-4 sm:py-2.5 sm:shadow-[0_20px_35px_-28px_rgba(30,41,59,0.45)] ${
                    index === 0
                      ? 'ml-1 self-start sm:ml-0 sm:self-start'
                      : index === 1
                        ? 'self-center sm:self-center'
                        : 'mr-1 self-end sm:mr-0 sm:self-end'
                  }`}
                >
                  <span className="inline-flex justify-center rounded-lg border border-[#507afe]/20 bg-linear-to-r from-[#507afe]/10 to-[#655ccf]/10 px-2.5 py-0.5 text-sm font-semibold text-[#507afe] sm:text-base">
                    {item.value}
                  </span>
                  <p className="pr-1 text-sm font-semibold text-slate-900 sm:text-base">
                    {item.title}
                  </p>
                </RevealItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
