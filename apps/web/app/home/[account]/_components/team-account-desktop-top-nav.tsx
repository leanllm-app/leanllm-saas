'use client';

import type { JWTUserData } from '@kit/supabase/types';

import { AppLogo } from '~/components/app-logo';
import { ProfileAccountDropdownContainer } from '~/components/personal-account-dropdown-container';

/** Barra superior só em desktop (≥lg): fundo branco, logo à esquerda, conta à direita (mesmo dropdown da sidebar). */
export function TeamAccountDesktopTopNav(props: { user: JWTUserData }) {
  return (
    <header
      className={
        'sticky top-0 z-50 hidden w-full shrink-0 border-b border-border/50 bg-white lg:flex lg:h-14 lg:items-center'
      }
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between gap-4 px-4 lg:px-6">
        <AppLogo />

        <ProfileAccountDropdownContainer
          user={props.user}
          minimalTrigger
          className="w-auto max-w-[min(100%,280px)] shrink-0"
        />
      </div>
    </header>
  );
}
