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
import { ApiKeysSection } from './_lib/components/api-keys-section';
import { createApiKeysService } from './_lib/server/api-keys.service';

interface ApiKeysPageProps {
  params: Promise<{ account: string }>;
}

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();

  return {
    title: i18n.t('common:routes.apiKeys'),
  };
};

async function ApiKeysPage({ params }: ApiKeysPageProps) {
  const slug = (await params).account;
  const { account } = await loadTeamWorkspace(slug);
  const client = getSupabaseServerClient();
  const service = createApiKeysService(client);
  const apiKeys = await service.listByAccount(account.id);

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={slug}
        title={<Trans i18nKey={'common:routes.apiKeys'} />}
        description={<AppBreadcrumbs />}
      />

      <PageBody>
        <div className="flex w-full flex-col space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for your LeanLLM integration. Keys are used to
                authenticate your SDK with the LeanLLM service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiKeysSection accountId={account.id} initialData={apiKeys} />
            </CardContent>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

export default withI18n(ApiKeysPage);
