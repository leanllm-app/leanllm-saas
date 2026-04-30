'use client';

import { usePathname } from 'next/navigation';

import {
  BorderedNavigationMenu,
  BorderedNavigationMenuItem,
} from '@kit/ui/bordered-navigation-menu';
import { Card, CardContent } from '@kit/ui/card';

export function SettingsTabsCard(props: {
  account: string;
  billingEnabled: boolean;
}) {
  const pathname = usePathname() ?? '';
  const basePath = `/home/${props.account}/settings`;
  const companyPath = `${basePath}/company`;
  const membersPath = `${basePath}/members`;
  const billingPath = `${basePath}/billing`;

  const normalizedPathname = normalizePath(pathname);

  const isCompanyActive =
    normalizedPathname === normalizePath(basePath) ||
    normalizedPathname === normalizePath(companyPath);

  const isMembersActive = normalizedPathname === normalizePath(membersPath);
  const isBillingActive =
    normalizedPathname === normalizePath(billingPath) ||
    normalizedPathname.startsWith(`${normalizePath(billingPath)}/`);

  return (
    <Card>
      <CardContent className={'py-2'}>
        <div className={'w-full [&_ul]:w-full'}>
          <BorderedNavigationMenu>
          <BorderedNavigationMenuItem
            label={'Company'}
            path={companyPath}
            active={isCompanyActive}
            className={'flex-1'}
            buttonClassName={'w-full justify-center'}
          />

          <BorderedNavigationMenuItem
            label={'common:routes.members'}
            path={membersPath}
            active={isMembersActive}
            className={'flex-1'}
            buttonClassName={'w-full justify-center'}
          />

          {props.billingEnabled ? (
            <BorderedNavigationMenuItem
              label={'common:routes.billing'}
              path={billingPath}
              active={isBillingActive}
              className={'flex-1'}
              buttonClassName={'w-full justify-center'}
            />
          ) : null}
          </BorderedNavigationMenu>
        </div>
      </CardContent>
    </Card>
  );
}

function normalizePath(path: string) {
  return path.replace(/\/+$/, '');
}
