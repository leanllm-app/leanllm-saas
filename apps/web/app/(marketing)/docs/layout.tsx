import { SidebarProvider } from '@kit/ui/shadcn-sidebar';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';

// local imports
import { DocsNavigation } from './_components/docs-navigation';
import { getDocs } from './_lib/server/docs.loader';
import { buildDocumentationTree } from './_lib/utils';

async function DocsLayout({ children }: React.PropsWithChildren) {
  const { resolvedLanguage } = await createI18nServerInstance();
  const docs = await getDocs(resolvedLanguage);
  const tree = buildDocumentationTree(docs);

  return (
    <div className={'container min-h-[calc(100svh-56px)] py-4 md:py-6'}>
      <SidebarProvider
        className="items-start gap-0 lg:gap-x-8"
        style={{ '--sidebar-width': '18rem' } as React.CSSProperties}
      >
        <HideFooterStyles />

        <DocsNavigation pages={tree} />

        <div className="min-w-0 flex-1">{children}</div>
      </SidebarProvider>
    </div>
  );
}

function HideFooterStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .site-footer {
            display: none;
          }
        `,
      }}
    />
  );
}

export default DocsLayout;
