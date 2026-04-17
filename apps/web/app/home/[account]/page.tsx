import { Activity, Clock, DollarSign, Zap } from 'lucide-react';

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

import {
  CostOverTimeChart,
  TopFeaturesChart,
  TopModelsChart,
} from './_components/dashboard-charts';
import { TeamAccountLayoutPageHeader } from './_components/team-account-layout-page-header';
import { createDashboardService } from './_lib/server/dashboard.service';
import { loadTeamWorkspace } from './_lib/server/team-account-workspace.loader';

interface TeamAccountHomePageProps {
  params: Promise<{ account: string }>;
}

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('teams:home.pageTitle');

  return {
    title,
  };
};

async function TeamAccountHomePage({ params }: TeamAccountHomePageProps) {
  const slug = (await params).account;
  const { account } = await loadTeamWorkspace(slug);
  const client = getSupabaseServerClient();
  const service = createDashboardService(client);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const since = thirtyDaysAgo.toISOString();
  const until = now.toISOString();

  const [summary, costOverTime, costByFeature, costByModel] = await Promise.all(
    [
      service.getSummary(account.id, since, until),
      service.getCostOverTime(account.id, since, until),
      service.getCostByFeature(account.id, since, until),
      service.getCostByModel(account.id, since, until),
    ],
  );

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={slug}
        title={<Trans i18nKey={'common:routes.dashboard'} />}
        description={<AppBreadcrumbs />}
      />

      <PageBody>
        <div
          className={
            'animate-in fade-in flex flex-col space-y-4 pb-36 duration-500'
          }
        >
          <div
            className={'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'}
          >
            <SummaryCard
              title="Total Cost"
              value={`$${summary.totalCost.toFixed(4)}`}
              description="Last 30 days"
              icon={<DollarSign className={'h-4 w-4'} />}
            />
            <SummaryCard
              title="Total Calls"
              value={summary.totalCalls.toLocaleString()}
              description="Last 30 days"
              icon={<Activity className={'h-4 w-4'} />}
            />
            <SummaryCard
              title="Total Tokens"
              value={summary.totalTokens.toLocaleString()}
              description="Last 30 days"
              icon={<Zap className={'h-4 w-4'} />}
            />
            <SummaryCard
              title="Avg Latency"
              value={`${summary.avgLatency}ms`}
              description="Last 30 days"
              icon={<Clock className={'h-4 w-4'} />}
            />
          </div>

          <CostOverTimeChart data={costOverTime} />

          <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2'}>
            <TopFeaturesChart data={costByFeature} />
            <TopModelsChart data={costByModel} />
          </div>
        </div>
      </PageBody>
    </>
  );
}

function SummaryCard(props: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
        <CardTitle className={'text-sm font-medium'}>{props.title}</CardTitle>
        <span className={'text-muted-foreground'}>{props.icon}</span>
      </CardHeader>
      <CardContent>
        <div className={'text-2xl font-bold'}>{props.value}</div>
        <CardDescription className={'text-xs'}>
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default withI18n(TeamAccountHomePage);
