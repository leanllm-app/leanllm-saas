import * as React from 'react';

import { cn } from '../lib/utils';
import { Separator } from '../shadcn/separator';
import { SidebarTrigger } from '../shadcn/sidebar';
import { If } from './if';

export type PageLayoutStyle = 'sidebar' | 'header' | 'custom';

type PageProps = React.PropsWithChildren<{
  style?: PageLayoutStyle;
  contentContainerClassName?: string;
  className?: string;
  sticky?: boolean;
  /** Sidebar + main column inside a centered max-width shell (wider than 7xl), Fly.io-style */
  workspaceShell?: 'full' | 'centered';
}>;

const ENABLE_SIDEBAR_TRIGGER = process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER
  ? process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER === 'true'
  : true;

export function Page(props: PageProps) {
  switch (props.style) {
    case 'header':
      return <PageWithHeader {...props} />;

    case 'custom':
      return props.children;

    default:
      return <PageWithSidebar {...props} />;
  }
}

function PageWithSidebar(props: PageProps) {
  const { Navigation, Children, MobileNavigation } = getSlotsFromPage(props);
  const workspaceShell = props.workspaceShell ?? 'full';

  if (workspaceShell === 'centered') {
    return (
      <div
        className={cn(
          'flex min-h-0 min-w-0 flex-1 overflow-x-hidden',
          props.className,
        )}
      >
        <div
          className={
            props.contentContainerClassName ??
            'mx-auto my-1.5 flex min-h-0 w-full max-w-screen-2xl flex-1 items-start gap-3 px-3 sm:my-2 sm:gap-4 sm:px-4 lg:my-3 lg:gap-6 lg:px-6'
          }
        >
          {Navigation}

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {MobileNavigation}

            <div
              className={
                'w-full shrink-0 rounded-xl border border-border/60 bg-card pb-3 shadow-sm sm:rounded-2xl sm:pb-4'
              }
            >
              {Children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex min-h-0 min-w-0 flex-1 overflow-x-hidden',
        props.className,
      )}
    >
      {Navigation}

      <div
        className={
          props.contentContainerClassName ??
          'mx-auto flex h-screen w-full min-w-0 flex-1 flex-col bg-transparent'
        }
      >
        {MobileNavigation}

        <div
          className={
            'mx-auto flex w-full max-w-[1440px] min-w-0 flex-1 flex-col px-4 pb-4 lg:px-6 lg:pb-6'
          }
        >
          {Children}
        </div>
      </div>
    </div>
  );
}

export function PageMobileNavigation(
  props: React.PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <div
      className={cn(
        'flex w-full items-center border-b px-3 py-1.5 sm:px-4 sm:py-2 lg:hidden lg:px-0',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

function PageWithHeader(props: PageProps) {
  const { Navigation, Children, MobileNavigation } = getSlotsFromPage(props);

  return (
    <div className={cn('flex h-screen flex-1 flex-col', props.className)}>
      <div
        className={
          props.contentContainerClassName ?? 'flex flex-1 flex-col space-y-4'
        }
      >
        <div
          className={cn(
            'bg-muted/40 dark:border-border dark:shadow-primary/10 flex h-14 items-center justify-between px-4 lg:justify-start lg:shadow-xs',
            {
              'sticky top-0 z-10 backdrop-blur-md': props.sticky ?? true,
            },
          )}
        >
          <div
            className={'hidden w-full flex-1 items-center space-x-8 lg:flex'}
          >
            {Navigation}
          </div>

          {MobileNavigation}
        </div>

        <div className={'container flex flex-1 flex-col'}>{Children}</div>
      </div>
    </div>
  );
}

export function PageBody(
  props: React.PropsWithChildren<{
    className?: string;
  }>,
) {
  const className = cn(
    'flex min-w-0 flex-1 flex-col px-3 sm:px-4 lg:px-4',
    props.className,
  );

  return <div className={className}>{props.children}</div>;
}

export function PageNavigation(props: React.PropsWithChildren) {
  return <div className={'bg-inherit'}>{props.children}</div>;
}

export function PageDescription(props: React.PropsWithChildren) {
  return (
    <div className={'flex h-6 items-center'}>
      <div className={'text-muted-foreground text-xs leading-none font-normal'}>
        {props.children}
      </div>
    </div>
  );
}

export function PageTitle(props: React.PropsWithChildren) {
  return (
    <h1
      className={
        'font-heading text-base leading-none font-bold tracking-tight dark:text-white'
      }
    >
      {props.children}
    </h1>
  );
}

export function PageHeaderActions(props: React.PropsWithChildren) {
  return <div className={'flex items-center space-x-2'}>{props.children}</div>;
}

export function PageHeader({
  children,
  title,
  description,
  className,
  displaySidebarTrigger = ENABLE_SIDEBAR_TRIGGER,
}: React.PropsWithChildren<{
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  displaySidebarTrigger?: boolean;
}>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 lg:px-4 lg:py-5',
        className,
      )}
    >
      <div className={'flex flex-col gap-y-2'}>
        <div className="flex items-center gap-x-2.5">
          {displaySidebarTrigger ? (
            <SidebarTrigger className="text-muted-foreground hover:text-secondary-foreground hidden h-4.5 w-4.5 cursor-pointer lg:inline-flex" />
          ) : null}

          <If condition={description}>
            <If condition={displaySidebarTrigger}>
              <Separator
                orientation="vertical"
                className="hidden h-4 w-px lg:group-data-[minimized]:block"
              />
            </If>

            <PageDescription>{description}</PageDescription>
          </If>
        </div>

        <If condition={title}>
          <PageTitle>{title}</PageTitle>
        </If>
      </div>

      {children}
    </div>
  );
}

function getSlotsFromPage(props: React.PropsWithChildren) {
  return React.Children.toArray(props.children).reduce<{
    Children: React.ReactElement | null;
    Navigation: React.ReactElement | null;
    MobileNavigation: React.ReactElement | null;
  }>(
    (acc, child) => {
      if (!React.isValidElement(child)) {
        return acc;
      }

      if (child.type === PageNavigation) {
        return {
          ...acc,
          Navigation: child,
        };
      }

      if (child.type === PageMobileNavigation) {
        return {
          ...acc,
          MobileNavigation: child,
        };
      }

      return {
        ...acc,
        Children: child,
      };
    },
    {
      Children: null,
      Navigation: null,
      MobileNavigation: null,
    },
  );
}
