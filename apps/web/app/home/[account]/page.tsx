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

import { DashboardChartsSection } from './_components/dashboard/dashboard-charts-section';
import { DashboardInsightsSection } from './_components/dashboard/dashboard-insights-section';
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

  const [
    summary,
    costOverTime,
    costByFeature,
    costByModel,
    costPer1kByModel,
    latencyVsCost,
  ] = await Promise.all(
    [
      service.getSummary(account.id, since, until),
      service.getCostOverTime(account.id, since, until),
      service.getCostByFeature(account.id, since, until),
      service.getCostByModel(account.id, since, until),
      service.getCostPer1kTokensByModel(account.id, since, until),
      service.getLatencyVsCost(account.id, since, until),
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
            'animate-in fade-in flex flex-col space-y-2 duration-500 sm:space-y-3 md:space-y-4'
          }
        >
          <div
            className={
              'grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4'
            }
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

          <DashboardChartsSection
            costOverTime={costOverTime}
            costByFeature={costByFeature}
            costByModel={costByModel}
          />

          <DashboardInsightsSection
            costPer1kByModel={costPer1kByModel}
            latencyVsCost={latencyVsCost}
          />
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
    <Card className="cursor-default relative overflow-hidden rounded-lg border border-slate-200/80 bg-background transition-transform duration-300 will-change-transform hover:-translate-y-1.5 dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)] bg-[radial-gradient(95%_110%_at_14%_0%,rgba(80,122,254,0.18),rgba(101,92,207,0.09)_34%,transparent_72%)]">
      <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 p-3 pb-2 sm:p-4">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        <span className="relative z-10 flex items-center justify-center rounded-lg border border-white/70 bg-white/55 p-2 text-foreground shadow-[0_8px_24px_-18px_rgba(30,41,59,0.55)] backdrop-blur-md">
          {props.icon}
        </span>
      </CardHeader>
      <CardContent className="relative z-10 p-3 pt-0 sm:p-4 sm:pt-0">
        <div className="text-xl font-bold sm:text-2xl">{props.value}</div>
        <CardDescription className="text-xs">{props.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default withI18n(TeamAccountHomePage);
