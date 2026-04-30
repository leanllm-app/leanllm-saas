import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import Script from 'next/script';

import { SiteFooter } from '~/(marketing)/_components/site-footer';
import { SiteHeader } from '~/(marketing)/_components/site-header';
import { withI18n } from '~/lib/i18n/with-i18n';
import { LpHeader } from './_components/lp-header';
import { MarketingThemeProvider } from './_components/marketing-theme-provider';

async function SiteLayout(props: React.PropsWithChildren) {
  const client = getSupabaseServerClient();
  const user = await requireUser(client, { verifyMfa: false });

  return (
    <>
      <Script id="force-marketing-light" strategy="beforeInteractive">
        {`
          try {
            localStorage.setItem('theme', 'light');
            document.cookie = 'theme=light; path=/; max-age=31536000; samesite=lax';
          } catch (e) {}

          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          document.documentElement.style.colorScheme = 'light';
        `}
      </Script>

      <MarketingThemeProvider>
        <div className={'flex min-h-screen flex-col bg-white'}>
          {/* <SiteHeader user={user.data} /> */}
          <LpHeader />

          {props.children}

          <SiteFooter />
        </div>
      </MarketingThemeProvider>
    </>
  );
}

export default withI18n(SiteLayout);
