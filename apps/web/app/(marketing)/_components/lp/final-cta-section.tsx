import { ArrowRightIcon } from 'lucide-react';
import { RevealItem, StaggerReveal } from './scroll-reveal';

export function FinalCtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-24 pt-6 sm:px-8 sm:pt-10 md:px-10">
      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px w-full max-w-6xl bg-linear-to-r from-transparent via-[#507afe]/25 to-transparent sm:mb-12"
      />

      <StaggerReveal
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#507afe]/20 bg-linear-to-br from-[#507afe]/4 via-white to-[#655ccf]/5 px-6 py-12 text-center sm:px-10 sm:py-16"
        staggerChildren={0.1}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#507afe]/55 to-transparent"
        />

        <RevealItem>
          <h2 className="text-4xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Stop guessing your LLM costs.
            <span className="mt-2 block bg-linear-to-r from-[#507afe] to-[#655ccf] bg-clip-text text-transparent">
              Start controlling them.
            </span>
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:mt-6 sm:text-base md:text-lg">
            Two minutes to install. Immediate cost visibility. Open source.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
            <a
              href="/auth/sign-up"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#507afe] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4169f3] sm:h-11"
            >
              Get Started
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-6 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#507afe]/30 hover:bg-white sm:h-11"
            >
              GitHub
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
        </RevealItem>
      </StaggerReveal>
    </section>
  );
}
