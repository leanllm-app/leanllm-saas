import {
  ActivityIcon,
  Layers3Icon,
  UserRoundIcon,
  WaypointsIcon,
  type LucideIcon,
} from 'lucide-react';

type SolutionItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const solutions: SolutionItem[] = [
  {
    icon: Layers3Icon,
    title: 'Cost per feature',
    description: 'Know exactly which product feature is expensive.',
  },
  {
    icon: UserRoundIcon,
    title: 'Cost per user',
    description: 'Find the users driving your LLM spend.',
  },
  {
    icon: WaypointsIcon,
    title: 'Most expensive requests',
    description: 'Surface the outliers that spike your bill.',
  },
  {
    icon: ActivityIcon,
    title: 'Token + latency tracking',
    description: 'Correlate cost with performance in one view.',
  },
];

export function SolutionSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-8 md:px-10">
      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px w-full max-w-6xl bg-linear-to-r from-transparent via-[#507afe]/25 to-transparent sm:mb-12"
      />
      <div className="mx-auto max-w-6xl">
        <p className="mx-auto w-fit rounded-md border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-center text-xs font-semibold tracking-[0.14em] text-[#655ccf] uppercase">
          The Solution
        </p>

        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          You don&apos;t need more logs.
          <span className="mt-1 block bg-linear-to-r from-[#507afe] to-[#655ccf] bg-clip-text text-transparent">
            You need answers.
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          LeanLLM is a cost intelligence layer. Not another logging tool. It
          tells you where the money goes and what to do about it.
        </p>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {solutions.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(80,122,254,0.5)] transition hover:-translate-y-0.5 hover:border-[#507afe]/30 hover:shadow-[0_18px_36px_-24px_rgba(80,122,254,0.6)]"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-r from-[#507afe]/12 to-[#655ccf]/12 text-[#507afe]">
                  <item.icon className="size-4" />
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
