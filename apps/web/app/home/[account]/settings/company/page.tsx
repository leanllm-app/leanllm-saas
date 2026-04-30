import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { createTeamAccountsApi } from '@kit/team-accounts/api';
import { TeamAccountSettingsContainer } from '@kit/team-accounts/components';
import { AppBreadcrumbs } from '@kit/ui/app-breadcrumbs';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import featuresFlagConfig from '~/config/feature-flags.config';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';

import { TeamAccountLayoutPageHeader } from '../../_components/team-account-layout-page-header';
import { createApiKeysService } from '../../api-keys/_lib/server/api-keys.service';
import { IntegrationGuide } from '../_lib/components/integration-guide';
import { SettingsTabsCard } from '../_components/settings-tabs-card';

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('teams:settings:pageTitle');

  return {
    title,
  };
};

interface TeamAccountSettingsCompanyPageProps {
  params: Promise<{ account: string }>;
}

async function TeamAccountSettingsCompanyPage(
  props: TeamAccountSettingsCompanyPageProps,
) {
  const client = getSupabaseServerClient();
  const api = createTeamAccountsApi(client);
  const slug = (await props.params).account;
  const data = await api.getTeamAccount(slug);

  const account = {
    id: data.id,
    name: data.name,
    pictureUrl: data.picture_url,
    slug: data.slug as string,
    primaryOwnerUserId: data.primary_owner_user_id,
  };

  const features = {
    enableTeamDeletion: featuresFlagConfig.enableTeamDeletion,
  };

  const paths = {
    teamAccountSettings: `/home/${account.slug}/settings/company`,
  };

  const apiKeysService = createApiKeysService(client);
  const apiKeys = await apiKeysService.listByAccount(account.id);
  const firstActiveKey = apiKeys.find((k) => k.is_active);

  return (
    <>
      <TeamAccountLayoutPageHeader
        account={account.slug}
        title={<Trans i18nKey={'teams:settings.pageTitle'} />}
        description={<AppBreadcrumbs />}
      />

      <PageBody>
        <div className={'flex w-full flex-1 flex-col space-y-6'}>
          <SettingsTabsCard
            account={account.slug}
            billingEnabled={featuresFlagConfig.enableTeamAccountBilling}
          />

          {/* <IntegrationGuide apiKeyPrefix={firstActiveKey?.key_prefix} /> */}

          <TeamAccountSettingsContainer
            account={account}
            paths={paths}
            features={features}
          />
        </div>
      </PageBody>
    </>
  );
}

export default TeamAccountSettingsCompanyPage;
