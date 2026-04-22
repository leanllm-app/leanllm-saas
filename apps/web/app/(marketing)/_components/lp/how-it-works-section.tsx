import { ArrowRightIcon } from 'lucide-react';

type StepItem = {
  step: string;
  title: string;
  code: string;
  description: string;
};

const steps: StepItem[] = [
  {
    step: 'Step 1',
    title: 'Install the SDK',
    code: 'pip install leanllm',
    description: 'One line. No config files.',
  },
  {
    step: 'Step 2',
    title: 'Set your database URI',
    code: 'export LEANLLM_DATABASE_URI="postgres://..."',
    description: 'Events are stored where you control them.',
  },
  {
    step: 'Step 3',
    title: 'See structured events',
    code: '# Every LLM call is now tracked\n# with cost, tokens, latency, labels',
    description: 'Immediate visibility. No waiting.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-linear-to-r from-[#507afe]/8 to-[#655ccf]/8">
    <div className="mx-auto w-full max-w-7xl  px-4 py-20 sm:px-8  md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#655ccf] uppercase">
          How It Works
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Three steps. Under two minutes.
        </h2>

        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_-20px_rgba(80,122,254,0.35)] transition hover:-translate-y-0.5 hover:border-[#507afe]/30 hover:shadow-[0_20px_36px_-24px_rgba(80,122,254,0.45)]"
            >
              <span className="inline-flex rounded-md bg-linear-to-r from-[#507afe]/12 to-[#655ccf]/12 px-2.5 py-1 text-xs font-semibold text-[#507afe]">
                {item.step}
              </span>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <div className="mt-4 rounded-lg border border-[#507afe]/20 bg-linear-to-r from-[#507afe]/5 to-[#655ccf]/5 px-3 py-2.5">
                <pre className="whitespace-pre-wrap wrap-break-word font-mono text-xs leading-relaxed text-slate-800 sm:text-sm">
                  <code className="whitespace-pre-wrap wrap-break-word">
                    {item.code}
                  </code>
                </pre>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#507afe] transition hover:text-[#655ccf]"
          >
            Want deeper insights? Send events to LeanLLM Cloud
            <ArrowRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </div>
    </section>
  );
}
