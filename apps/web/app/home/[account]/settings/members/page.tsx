import { PlusCircle, ShieldCheck, UserPlus, Users } from 'lucide-react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import {
  AccountInvitationsTable,
  AccountMembersTable,
  InviteMembersDialogContainer,
} from '@kit/team-accounts/components';
import { AppBreadcrumbs } from '@kit/ui/app-breadcrumbs';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { If } from '@kit/ui/if';
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import featureFlagsConfig from '~/config/feature-flags.config';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

// local imports
import { TeamAccountLayoutPageHeader } from '../../_components/team-account-layout-page-header';
import { SettingsTabsCard } from '../_components/settings-tabs-card';
import { loadMembersPageData } from './_lib/server/members-page.loader';

interface TeamAccountMembersPageProps {
  params: Promise<{ account: string }>;
}

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('teams:members.pageTitle');

  return {
    title,
  };
};

async function TeamAccountMembersPage({ params }: TeamAccountMembersPageProps) {
  const client = getSupabaseServerClient();
  const slug = (await params).account;

  const [members, invitations, canAddMember, { user, account }] =
    await loadMembersPageData(client, slug);

  const canManageRoles = account.permissions.includes('roles.manage');
  const canManageInvitations = account.permissions.includes('invites.manage');
  const canInviteMember = canManageInvitations && canAddMember;

  const isPrimaryOwner = account.primary_owner_user_id === user.id;
  const currentUserRoleHierarchy = account.role_hierarchy_level;

  return (
    <>
      <TeamAccountLayoutPageHeader
        title={<Trans i18nKey={'common:routes.members'} />}
        description={<AppBreadcrumbs />}
        account={account.slug}
      />

      <PageBody>
        <div className={'flex w-full flex-col space-y-4'}>
          <SettingsTabsCard
            account={account.slug}
            billingEnabled={featureFlagsConfig.enableTeamAccountBilling}
          />

          <Card className={'border-primary/20 bg-linear-to-r from-primary/5 to-transparent'}>
            <CardHeader className={'space-y-4'}>
              <div className={'flex flex-wrap items-center gap-2'}>
                <Badge variant={'secondary'} className={'gap-1.5 px-2 py-1'}>
                  <Users className={'h-3.5 w-3.5'} />
                  <span>{members.length} membros</span>
                </Badge>

                <Badge variant={'outline'} className={'gap-1.5 px-2 py-1'}>
                  <UserPlus className={'h-3.5 w-3.5'} />
                  <span>{invitations.length} convites pendentes</span>
                </Badge>

                {isPrimaryOwner ? (
                  <Badge variant={'success'} className={'gap-1.5 px-2 py-1'}>
                    <ShieldCheck className={'h-3.5 w-3.5'} />
                    <span>Primary Owner</span>
                  </Badge>
                ) : null}
              </div>

              <div className={'flex flex-row items-start justify-between gap-3'}>
                <div className={'flex flex-col space-y-1.5'}>
                <CardTitle>
                  <Trans i18nKey={'common:accountMembers'} />
                </CardTitle>

                <CardDescription>
                  <Trans i18nKey={'common:membersTabDescription'} />
                </CardDescription>
              </div>

                <If condition={canInviteMember}>
                <InviteMembersDialogContainer
                  userRoleHierarchy={currentUserRoleHierarchy}
                  accountSlug={account.slug}
                >
                    <Button
                      size={'sm'}
                      data-test={'invite-members-form-trigger'}
                      className={'shrink-0'}
                    >
                    <PlusCircle className={'mr-2 w-4'} />

                    <span>
                      <Trans i18nKey={'teams:inviteMembersButton'} />
                    </span>
                  </Button>
                </InviteMembersDialogContainer>
              </If>
              </div>
            </CardHeader>

            <CardContent>
              <AccountMembersTable
                userRoleHierarchy={currentUserRoleHierarchy}
                currentUserId={user.id}
                currentAccountId={account.id}
                members={members}
                isPrimaryOwner={isPrimaryOwner}
                canManageRoles={canManageRoles}
              />
            </CardContent>
          </Card>

          <Card className={'border-muted-foreground/20'}>
            <CardHeader className={'flex flex-row justify-between'}>
              <div className={'flex flex-col space-y-1.5'}>
                <CardTitle>
                  <Trans i18nKey={'teams:pendingInvitesHeading'} />
                </CardTitle>

                <CardDescription>
                  <Trans i18nKey={'teams:pendingInvitesDescription'} />
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <AccountInvitationsTable
                permissions={{
                  canUpdateInvitation: canManageRoles,
                  canRemoveInvitation: canManageRoles,
                  currentUserRoleHierarchy,
                }}
                invitations={invitations}
              />
            </CardContent>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

export default withI18n(TeamAccountMembersPage);
