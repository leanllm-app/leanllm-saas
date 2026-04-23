import { cn } from '@kit/ui/utils';
import {
  ActivityIcon,
  Layers3Icon,
  UserRoundIcon,
  WaypointsIcon,
} from 'lucide-react';
import { RevealItem, StaggerReveal } from './scroll-reveal';

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
};


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

        
        <StaggerReveal className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <RevealItem key={feature.title}>
              <FeatureCard feature={feature} />
            </RevealItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn(
				"relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-background px-6 pt-8 pb-6 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)] transition-transform duration-300 will-change-transform hover:-translate-y-1.5",
				// Spotlight starts near the icon (top-left)
				"bg-[radial-gradient(95%_110%_at_14%_0%,rgba(80,122,254,0.18),rgba(101,92,207,0.09)_34%,transparent_72%)]",
				// Keep a subtle effect if dark mode appears anywhere
				"dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
				className
			)}
			{...props}
		>
			<div
				className={cn(
					"relative z-10 flex w-fit items-center justify-center rounded-lg border border-white/70 bg-white/55 p-3 shadow-[0_8px_24px_-18px_rgba(30,41,59,0.55)] backdrop-blur-md",
					"[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground"
				)}
			>
				{feature.icon}
			</div>

			<div className="relative z-10 space-y-2">
				<h3 className="font-medium text-base text-foreground">
					{feature.title}
				</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					{feature.description}
				</p>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Cost per feature",
		icon: (
			<Layers3Icon
			/>
		),
		description: "Know exactly which product feature is expensive.",
	},
	{
		title: "Cost per user",
		icon: (
			<UserRoundIcon
			/>
		),
		description: "Find the users driving your LLM spend.",
	},
	{
		title: "Most expensive requests",
		icon: (
			<WaypointsIcon
			/>
		),
		description: "Surface the outliers that spike your bill.",
	},
	{
		title: "Token + latency tracking",
		icon: (
			<ActivityIcon
			/>
		),
		description: "Correlate cost with performance in one view.",
	},
];