import {
  ChartNoAxesCombinedIcon,
  DatabaseIcon,
  FlameIcon,
  GaugeIcon,
  Repeat2Icon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';

type OutcomeItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const outcomes: OutcomeItem[] = [
  {
    icon: FlameIcon,
    title: 'See which feature is burning your budget',
    description: 'Label every LLM call by feature. Instantly know what costs the most.',
  },
  {
    icon: UsersIcon,
    title: 'Find your most expensive users instantly',
    description: 'Track cost per user. Identify power users skewing your spend.',
  },
  {
    icon: Repeat2Icon,
    title: 'Detect waste in retries and fallbacks',
    description: 'Hidden retry logic inflates your bill. LeanLLM exposes it.',
  },
  {
    icon: GaugeIcon,
    title: 'Correlate cost with latency',
    description: "Expensive doesn't always mean slow. Know which calls are both.",
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Track model usage across your stack',
    description: 'GPT-4o, Claude, Gemini - see costs by model in one place.',
  },
  {
    icon: DatabaseIcon,
    title: 'Export events. Query anything.',
    description: 'Your data, your database. Run any SQL query you want.',
  },
];

export function OutcomesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-20 pt-4 sm:px-8 sm:pt-8 md:px-10">
      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px w-full max-w-6xl bg-linear-to-r from-transparent via-[#507afe]/25 to-transparent sm:mb-12"
      />

      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.18em] text-[#655ccf] uppercase">
          Outcomes
        </p>

        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Not features.
          <span className="ml-2 bg-linear-to-r from-[#507afe] to-[#655ccf] bg-clip-text text-transparent">
            Decisions.
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Every capability in LeanLLM exists to help you make a cost decision -
          not to look pretty on a dashboard.
        </p>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {outcomes.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(80,122,254,0.55)] transition duration-200 hover:-translate-y-0.5 hover:border-[#507afe]/30 hover:shadow-[0_22px_44px_-26px_rgba(80,122,254,0.65)]"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#507afe]/60 to-transparent opacity-70" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#507afe]/12 to-[#655ccf]/12 text-[#507afe] ring-1 ring-[#507afe]/20">
                <item.icon className="size-5" />
              </span>

              <h3 className="mt-4 text-xl leading-tight font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
