import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { docsV2Source } from '~/lib/docs-v2/source';

function DocumentationV2Layout({ children }: React.PropsWithChildren) {
  return (
    <RootProvider
      search={{
        options: {
          api: '/api/docs-v2/search',
        },
      }}
    >
      <div className="min-h-svh">
        <HideMarketingChromeStyles />

        <DocsLayout
          tree={docsV2Source.pageTree}
          sidebar={{
            defaultOpenLevel: 1,
          }}
        >
          {children}
        </DocsLayout>
      </div>
    </RootProvider>
  );
}

function HideMarketingChromeStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-marketing-header] {
            display: none;
          }

          .site-footer {
            display: none;
          }
        `,
      }}
    />
  );
}

export default DocumentationV2Layout;
