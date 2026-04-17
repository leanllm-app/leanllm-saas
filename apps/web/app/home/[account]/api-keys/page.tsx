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
import { ApiKeysTable } from './_lib/components/api-keys-table';
import { CreateKeyDialog } from './_lib/components/create-key-dialog';
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
        <div className={'flex w-full max-w-4xl flex-col space-y-4'}>
          <Card>
            <CardHeader
              className={'flex flex-row items-center justify-between'}
            >
              <div className={'flex flex-col space-y-1.5'}>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for your LeanLLM integration. Keys are used to
                  authenticate your SDK with the LeanLLM service.
                </CardDescription>
              </div>

              <CreateKeyDialog accountId={account.id} />
            </CardHeader>

            <CardContent>
              <ApiKeysTable data={apiKeys} />
            </CardContent>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

export default withI18n(ApiKeysPage);
