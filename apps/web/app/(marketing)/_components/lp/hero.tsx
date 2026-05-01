import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@kit/ui/utils';
import { LightRays } from '@kit/ui/light-rays';
import Link from 'next/link';
import { CodeTerminal } from './code-terminal';
import { RevealItem, StaggerReveal } from './scroll-reveal';


export function HeroSection() {
  const heroCode = `from leanllm import LeanLLM
client = LeanLLM()
client.chat(model="gpt-4o", messages=[...], labels={"feature": "chat"},)`;

  return (
    <section className="relative isolate overflow-hidden bg-white">
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pb-16 lg:pt-28">
      <StaggerReveal
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
        staggerChildren={0.1}
      >
        <RevealItem>
          <Link
          href="/docs"
          className={cn(
            'mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-slate-300 sm:mb-7 sm:px-4 sm:text-xs',
          )}
        >
          <span className="size-2 rounded-full bg-[#507afe]" />
          Open-source SDK - install in 30 seconds
        </Link>
        </RevealItem>

        <RevealItem>
          <h1 className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl md:text-6xl">
            Your LLM bill isn&apos;t random.
            <span className="mt-1 block bg-linear-to-r from-[#507afe] to-[#655ccf] bg-clip-text text-transparent">
              You just can&apos;t see it.
            </span>
          </h1>
        </RevealItem>

        <RevealItem>
          <p className="mt-5 max-w-3xl text-sm text-balance text-slate-600 sm:mt-6 sm:text-base md:text-lg">
            LeanLLM shows exactly where your LLM cost comes from - per feature,
            per user, per request.
          </p>
        </RevealItem>

        <RevealItem className="w-full">
          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-9 sm:gap-3">
          <a
            href="/auth/sign-up"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#507afe] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4169f3] sm:h-11 sm:px-6"
          >
            Get Started
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 sm:h-11 sm:px-6"
          >
            View on GitHub
            <ArrowRightIcon className="size-4" />
          </a>
          </div>
        </RevealItem>

        <RevealItem className="w-full">
          <div className="mt-7 flex w-full items-center justify-center sm:mt-10">
            <div className="w-full md:max-w-2xl">
              <CodeTerminal code={heroCode} fileName="code.py" />

              {/* Info Text */}
              <div className="mt-3 px-2 text-center sm:mt-5">
                <p className="text-muted-foreground text-sm">
                  One import. One label. Full cost visibility.
                </p>
              </div>
            </div>
          </div>
        </RevealItem>
      </StaggerReveal>
      </div>
      <LightRays color="rgb(80 122 254 / 24%)" />
    </section>
  );
}
