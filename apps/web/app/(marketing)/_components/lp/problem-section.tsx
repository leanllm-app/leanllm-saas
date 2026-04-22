type ProblemStat = {
  value: string;
  description: string;
};

const stats: ProblemStat[] = [
  {
    value: '70%',
    description:
      "One feature silently consumes most of your LLM budget. You won't know until you look.",
  },
  {
    value: '3x',
    description:
      'Retries and fallback chains inflate your cost without showing up in your dashboard.',
  },
  {
    value: '10%',
    description:
      'A small group of users may drive most of your LLM spend. Can you name them?',
  },
];

export function ProblemSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.18em] text-[#507afe] uppercase">
          The Problem
        </p>

        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          You&apos;re flying blind with LLM costs.
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Your OpenAI bill went up 40% last month. You don&apos;t know why. Nobody
          does. That&apos;s the problem.
        </p>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {stats.map((item) => (
            <article
              key={item.value}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_26px_-22px_rgba(80,122,254,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#507afe]/35 hover:shadow-[0_18px_36px_-22px_rgba(80,122,254,0.6)] sm:p-6"
            >
              <span className="mb-4 block h-px w-full bg-linear-to-r from-[#507afe]/70 via-[#655ccf]/40 to-transparent" />
              <p className="text-3xl leading-none font-semibold tracking-tight text-[#507afe] sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
