"use client";
import { cn } from "@kit/ui/utils";
import { Button } from "@kit/ui/button";
import { MobileNav } from "./lp-mobile-nav";
import { useScroll } from "./use-scroll";
import { AppLogo } from "~/components/app-logo";

export const navLinks = [
	{
		label: "Features",
		href: "#",
	},
	{
		label: "Pricing",
		href: "#",
	},
	{
		label: "About",
		href: "#",
	},
];

export function LpHeader() {
	const scrolled = useScroll(10);

	return (
		<header
			data-marketing-header
			className="fixed inset-x-0 top-0 z-50 w-full"
		>
			<nav
				className={cn(
					"mx-auto flex h-14  w-full max-w-7xl items-center px-5 transition-all ease-out md:h-16 md:px-8",
					{
						"mt-2 max-w-7xl rounded-xl border border-border/70 bg-background/85 px-4 shadow backdrop-blur-md supports-backdrop-filter:bg-background/60 md:px-4":
							scrolled,
					}
				)}
			>
				<AppLogo />

				<div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Button
							asChild
							key={link.label}
							size="sm"
							variant="ghost"
							className="text-sm font-medium"
						>
							<a href={link.href}>{link.label}</a>
						</Button>
					))}
				</div>

				<div className="ml-auto hidden items-center gap-2 md:flex">
					<Button size="sm" variant="outline" className="text-sm font-medium">
						Sign In
					</Button>
					<Button size="sm" className="text-sm font-medium">
						Get Started
					</Button>
				</div>
				<div className="ml-auto md:hidden">
					<MobileNav />
				</div>
			</nav>
		</header>
	);
}
