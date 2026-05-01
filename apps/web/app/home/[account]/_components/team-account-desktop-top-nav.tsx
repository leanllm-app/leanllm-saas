'use client';

import type { JWTUserData } from '@kit/supabase/types';
import { cn } from '@kit/ui/utils';

import { useScroll } from '../../../(marketing)/_components/use-scroll';
import { AppLogo } from '~/components/app-logo';
import { ProfileAccountDropdownContainer } from '~/components/personal-account-dropdown-container';

/** Barra superior só em desktop (≥lg): fundo branco, logo à esquerda, conta à direita (mesmo dropdown da sidebar). */
export function TeamAccountDesktopTopNav(props: { user: JWTUserData }) {
  const scrolled = useScroll(10);

  return (
    <header className="sticky inset-x-0 top-0 z-50 hidden w-full shrink-0 lg:block">
      <nav
        className={cn(
          'mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between gap-4 px-3 transition-all ease-out sm:px-4 lg:px-6',
          {
            'mt-2 rounded-xl border border-border/70 bg-background/85  backdrop-blur-md supports-backdrop-filter:bg-background/60':
              scrolled,
          },
        )}
      >
        <AppLogo />

        <ProfileAccountDropdownContainer
          user={props.user}
          minimalTrigger
          className="w-auto max-w-[min(100%,280px)] shrink-0"
        />
      </nav>
    </header>
  );
}
