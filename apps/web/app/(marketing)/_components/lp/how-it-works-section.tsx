import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';

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
    <section className="overflow-x-clip bg-linear-to-b from-[#f8f9ff] via-white to-[#f9f7ff] md:mx-6 md:rounded-4xl">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_70px_-50px_rgba(80,122,254,0.45)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0 space-y-0.5 lg:pr-4">
              <p className="w-fit rounded-full border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#655ccf] uppercase">
                How It Works
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Three steps. Under two minutes.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                Install the SDK, connect your database, and start tracking every
                LLM call with cost and latency context in minutes.
              </p>

              <Button
                asChild
                variant="link"
                className="mt-6 h-auto w-full justify-start p-0 text-[#507afe] sm:mt-8 sm:w-fit"
              >
                <Link
                  href="/docs"
                  className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-left leading-relaxed whitespace-normal"
                >
                  Want deeper insights? Send events to LeanLLM Cloud
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="min-w-0 space-y-3 sm:space-y-4">
              {steps.map((item) => (
                <Card
                  key={item.step}
                  className="w-full overflow-hidden rounded-2xl border-slate-200/90 bg-linear-to-r from-white via-white to-[#faf9ff] transition hover:border-[#507afe]/25"
                >
                  <CardContent className="min-w-0 space-y-3 px-4 py-4 sm:px-5">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <span className="inline-flex shrink-0 rounded-md border border-[#507afe]/20 bg-linear-to-r from-[#507afe]/10 to-[#655ccf]/10 px-2.5 py-1 text-xs font-semibold text-[#507afe]">
                        {item.step}
                      </span>
                      <h3 className="min-w-0 text-base font-semibold text-slate-900 sm:text-lg">
                        {item.title}
                      </h3>
                    </div>

                    <div className="min-w-0 max-w-full rounded-lg border border-[#507afe]/15 bg-linear-to-r from-[#507afe]/5 to-[#655ccf]/5 px-3 py-2.5">
                      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word font-mono text-xs leading-relaxed text-slate-800 sm:text-sm">
                        <code className="whitespace-pre-wrap wrap-break-word">
                          {item.code}
                        </code>
                      </pre>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
