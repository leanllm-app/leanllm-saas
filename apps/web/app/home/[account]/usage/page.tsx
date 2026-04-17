import { Suspense } from 'react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { AppBreadcrumbs } from '@kit/ui/app-breadcrumbs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { TeamAccountLayoutPageHeader } from '../_components/team-account-layout-page-header';
import { loadTeamWorkspace } from '../_lib/server/team-account-workspace.loader';
import { EventsFilters } from './_lib/components/events-filters';
import { EventsTable } from './_lib/components/events-table';
import { createUsageService } from './_lib/server/usage.service';

interface UsagePageProps {
  params: Promise<{ account: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();

  return {
    title: i18n.t('common:routes.usage'),
  };
};

async function UsagePage({ params, searchParams }: UsagePageProps) {
  const slug = (await params).account;
  const sp = await searchParams;
  const { account } = await loadTeamWorkspace(slug);
  const client = getSupabaseServerClient();
  const service = createUsageService(client);

  const page = parseInt(sp.page ?? '1', 10) - 1;

  const [result, filterOptions] = await Promise.all([
    service.getEvents({
      accountId: account.id,
      page: Math.max(0, page),
      model: sp.model,
      feature: sp.feature,
      userId: sp.userId,
      since: sp.since,
      until: sp.until,
    }),
    service.getFilterOptions(account.id),
  ]);

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={slug}
        title={<Trans i18nKey={'common:routes.usage'} />}
        description={<AppBreadcrumbs />}
      />

      <PageBody>
        <div className={'flex w-full flex-col space-y-4'}>
          <Card>
            <CardHeader>
              <CardTitle>Usage Details</CardTitle>
              <CardDescription>
                Browse individual LLM events. Click a row to see full details.
              </CardDescription>
            </CardHeader>

            <CardContent className={'space-y-4'}>
              <Suspense>
                <EventsFilters
                  models={filterOptions.models}
                  features={filterOptions.features}
                />
              </Suspense>

              <EventsTable
                data={result.events}
                pageIndex={Math.max(0, page)}
                pageCount={result.pageCount}
              />
            </CardContent>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

export default withI18n(UsagePage);
