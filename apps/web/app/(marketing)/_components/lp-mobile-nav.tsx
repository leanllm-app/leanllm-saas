import { cn } from "@kit/ui/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@kit/ui/portal";
import { Button } from "@kit/ui/button";
import { navLinks } from "./lp-header";
import { XIcon, MenuIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import pathsConfig from "~/config/paths.config";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const handleNavClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		if (!href.startsWith("#")) {
			setOpen(false);
			return;
		}

		event.preventDefault();
		const target = document.querySelector<HTMLElement>(href);
		if (!target) return;
		target.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
		setOpen(false);
	};

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									asChild
									className="justify-start"
									key={link.label}
									variant="ghost"
								>
									<a href={link.href} onClick={(event) => handleNavClick(event, link.href)}>
										{link.label}
									</a>
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							<Button asChild className="w-full" variant="ghost">
								<a
									href="https://github.com/leanllm-app/LeanLLM"
									target="_blank"
									rel="noreferrer"
									aria-label="GitHub LeanLLM"
								>
									<GithubIcon className="size-5" />
								</a>
							</Button>
							<Button asChild className="w-full" variant="outline">
								<Link href={pathsConfig.auth.signIn}>Sign In</Link>
							</Button>
							<Button asChild className="w-full">
								<Link href={pathsConfig.auth.signUp}>Get Started</Link>
							</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
