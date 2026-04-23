import { FlickeringGrid } from '@kit/ui/flickering-grid';
import { cn } from '@kit/ui/utils';
import {
  ChartNoAxesCombinedIcon,
  DatabaseIcon,
  FlameIcon,
  GaugeIcon,
  Repeat2Icon,
  UsersIcon,
} from 'lucide-react';
import { RevealItem, StaggerReveal } from './scroll-reveal';

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function OutcomesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-20 pt-4 sm:px-8 sm:pt-8 md:px-10">
      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px w-full max-w-6xl bg-linear-to-r from-transparent via-[#507afe]/25 to-transparent sm:mb-12"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mx-auto w-fit rounded-md border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-center text-xs font-semibold tracking-[0.14em] text-[#655ccf] uppercase">
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

        <div className="mt-8 overflow-hidden rounded-lg border">
        <StaggerReveal className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <RevealItem key={feature.title}>
              <FeatureCard feature={feature} />
            </RevealItem>
          ))}
        </StaggerReveal>
        </div>
      </div>
    </section>
  );
}


export function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn('bg-background relative overflow-hidden p-6', className)}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
        <FlickeringGrid
          className="relative inset-0 z-0 mask-[radial-gradient(450px_circle_at_center,white,transparent)]"
          height={400}
          width={400}
          squareSize={4}
          gridGap={6}
          color="#507afe"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>
      <div className="[&_svg]:text-foreground/75 [&_svg]:size-7">
        {feature.icon}
      </div>
      <h3 className="text-md md:text-md mt-6 font-semibold">{feature.title}</h3>
      <p className="text-muted-foreground relative z-20 mt-2 text-sm font-light">
        {feature.description}
      </p>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: 'See which feature is burning your budget',
    icon: <FlameIcon />,
    description:
      'Label every LLM call by feature. Instantly know what costs the most.',
  },
  {
    title: 'Find your most expensive users instantly',
    icon: <UsersIcon />,
    description:
      'Track cost per user. Identify power users skewing your spend.',
  },
  {
    title: 'Detect waste in retries and fallbacks',
    icon: <Repeat2Icon />,
    description: 'Hidden retry logic inflates your bill. LeanLLM exposes it.',
  },
  {
    title: 'Correlate cost with latency',
    icon: <GaugeIcon />,
    description:
      "Expensive doesn't always mean slow. Know which calls are both.",
  },
  {
    title: 'Track model usage across your stack',
    icon: <ChartNoAxesCombinedIcon />,
    description: 'GPT-4o, Claude, Gemini - see costs by model in one place.',
  },
  {
    title: 'Export events. Query anything.',
    icon: <DatabaseIcon />,
    description: 'Your data, your database. Run any SQL query you want.',
  },
];