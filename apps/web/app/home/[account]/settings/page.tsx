import { redirect } from 'next/navigation';

interface TeamAccountSettingsPageProps {
  params: Promise<{ account: string }>;
}

async function TeamAccountSettingsPage(props: TeamAccountSettingsPageProps) {
  const slug = (await props.params).account;
  redirect(`/home/${slug}/settings/company`);
}

export default TeamAccountSettingsPage;
