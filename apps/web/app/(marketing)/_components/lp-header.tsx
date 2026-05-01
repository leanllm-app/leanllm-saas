"use client";
import type { MouseEvent } from "react";
import { cn } from "@kit/ui/utils";
import { Button } from "@kit/ui/button";
import { GithubIcon } from "lucide-react";
import { MobileNav } from "./lp-mobile-nav";
import { useScroll } from "./use-scroll";
import Link from "next/link";
import pathsConfig from "~/config/paths.config";
import { AppLogo } from "~/components/app-logo";

export const navLinks = [
	{
		label: "Solution",
		href: "#solution",
	},
	{
		label: "Pricing",
		href: "#pricing",
	},
	{
		label: "Why LeanLLM",
		href: "#why-leanllm",
	},
	{
		label: "Docs",
		href: "/docs-v2",
	},
];

export function LpHeader() {
	const scrolled = useScroll(10);
	const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
		if (!href.startsWith("#")) return;

		event.preventDefault();
		const target = document.querySelector<HTMLElement>(href);
		if (!target) return;
		target.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<header
			data-marketing-header
			className="fixed inset-x-0 top-0 z-50 w-full"
		>
			<nav
				className={cn(
					"mx-auto flex h-14  w-full max-w-7xl items-center px-5 transition-all ease-out md:h-16 md:px-8",
					{
						"mt-2 max-w-7xl rounded-xl border border-border/70 bg-background/85 px-4 backdrop-blur-md supports-backdrop-filter:bg-background/60 md:px-4":
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
							<a href={link.href} onClick={(event) => handleNavClick(event, link.href)}>
								{link.label}
							</a>
						</Button>
					))}
				</div>

				<div className="ml-auto hidden items-center gap-2 md:flex">
					<a
						href="https://github.com/leanllm-app/LeanLLM"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub LeanLLM"
						className="inline-flex h-9 w-9 items-center justify-center text-foreground/85 transition hover:text-foreground"
					>
						<GithubIcon className="size-5" />
					</a>
					<Button asChild size="sm" variant="outline" className="text-sm font-medium">
						<Link href={pathsConfig.auth.signIn}>Sign In</Link>
					</Button>
					<Button asChild size="sm" className="text-sm font-medium">
						<Link href={pathsConfig.auth.signUp}>Get Started</Link>
					</Button>
				</div>
				<div className="ml-auto md:hidden">
					<MobileNav />
				</div>
			</nav>
		</header>
	);
}
