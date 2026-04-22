import { ArrowRightIcon } from 'lucide-react';

type OfferCard = {
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const offers: OfferCard[] = [
  {
    label: 'Self-hosted',
    title: 'Use it locally',
    description:
      'Install the SDK. Point to your own Postgres. Full control. No data leaves your infra.',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com',
  },
  {
    label: 'Managed',
    title: 'Use LeanLLM Cloud',
    description:
      'Aggregated dashboards, alerts, team access, and deeper cost analysis. No infra to manage.',
    ctaLabel: 'Get Started',
    ctaHref: '/auth/sign-up',
    featured: true,
  },
];

export function OpenSourceSaasSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-20 pt-4 sm:px-8 sm:pt-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.18em] text-[#655ccf] uppercase">
          Open Source + SaaS
        </p>

        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Your data. Your rules.
        </h2>

        <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          The SDK is fully open-source. Self-host, inspect, contribute. LeanLLM
          Cloud is optional - for teams that want aggregation, alerts, and zero
          maintenance.
        </p>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {offers.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl border p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 ${
                item.featured
                  ? 'border-[#507afe]/40 bg-linear-to-br from-white to-[#507afe]/5'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                  item.featured
                    ? 'bg-[#507afe]/10 text-[#507afe]'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.label}
              </span>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>

              <a
                href={item.ctaHref}
                target={item.ctaHref.startsWith('http') ? '_blank' : undefined}
                rel={item.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                className={`mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition sm:h-11 ${
                  item.featured
                    ? 'bg-[#507afe] text-white hover:bg-[#4169f3]'
                    : 'border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {item.ctaLabel}
                <ArrowRightIcon className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
