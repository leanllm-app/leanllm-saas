import { Key, Widget5, Chart, Settings } from '@solar-icons/react/ssr'


import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import pathsConfig from '~/config/paths.config';

const iconClasses = 'w-4';
const iconColor = '#655ccf';
const iconSize = 28;

const getRoutes = (account: string) => [
  {
    label: 'common:routes.application',
    children: [
      {
        label: 'common:routes.dashboard',
        path: pathsConfig.app.accountHome.replace('[account]', account),
        Icon: <Widget5 weight='BoldDuotone' size={iconSize} color={iconColor}/>,
        end: true,
      },
      {
        label: 'common:routes.apiKeys',
        path: createPath(pathsConfig.app.accountApiKeys, account),
        Icon: <Key weight='BoldDuotone' size={iconSize} color={iconColor} />,
      },
      {
        label: 'common:routes.usage',
        path: createPath(pathsConfig.app.accountUsage, account),
        Icon: <Chart weight='BoldDuotone' size={iconSize} color={iconColor} />,
      },
    ],
  },
  {
    label: 'common:routes.settings',
    collapsible: false,
    children: [
      {
        label: 'common:routes.settings',
        path: createPath(pathsConfig.app.accountSettings, account),
        Icon: <Settings weight='BoldDuotone' size={iconSize} color={iconColor} />,
      },
    ],
  },
];

export function getTeamAccountSidebarConfig(account: string) {
  return NavigationConfigSchema.parse({
    routes: getRoutes(account),
    style: process.env.NEXT_PUBLIC_TEAM_NAVIGATION_STYLE,
    sidebarCollapsed: process.env.NEXT_PUBLIC_TEAM_SIDEBAR_COLLAPSED,
    sidebarCollapsedStyle: process.env.NEXT_PUBLIC_SIDEBAR_COLLAPSIBLE_STYLE,
  });
}

function createPath(path: string, account: string) {
  return path.replace('[account]', account);
}
