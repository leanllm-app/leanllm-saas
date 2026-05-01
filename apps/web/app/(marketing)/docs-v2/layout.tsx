import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { AppLogo } from '~/components/app-logo';
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
          nav={{
            title: <AppLogo href={null} className="w-[120px]" />,
            url: '/',
            transparentMode: 'top',
          }}
          githubUrl="https://github.com/leanllm-app/LeanLLM"
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

          /* LP-inspired docs theme */
          #nd-docs-layout {
            background:
              radial-gradient(1200px 500px at 20% -120px, rgba(80, 122, 254, 0.14), transparent 62%),
              radial-gradient(900px 420px at 88% -160px, rgba(101, 92, 207, 0.12), transparent 60%),
              linear-gradient(to bottom, #f8f9ff 0%, #ffffff 32%);
            color: rgb(30 41 59);
          }

          #nd-subnav {
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.82);
            border-bottom: 1px solid rgba(80, 122, 254, 0.14);
          }

          #nd-docs-layout aside {
            background: rgba(255, 255, 255, 0.72);
            border-right: 1px solid rgba(80, 122, 254, 0.14);
          }

          #nd-docs-layout main {
            background: transparent;
          }

          /* Sidebar links */
          #nd-docs-layout aside a {
            border-radius: 0.65rem;
            transition: all 160ms ease;
          }

          #nd-docs-layout aside a:hover {
            background: rgba(80, 122, 254, 0.08);
            color: rgb(48, 76, 184);
          }

          #nd-docs-layout aside a[data-active="true"] {
            background: linear-gradient(90deg, rgba(80, 122, 254, 0.14), rgba(101, 92, 207, 0.1));
            color: rgb(59, 84, 191);
            font-weight: 600;
          }

          /* Content typography */
          #nd-docs-layout article h1,
          #nd-docs-layout article h2,
          #nd-docs-layout article h3,
          #nd-docs-layout article h4 {
            color: rgb(39 39 42) !important;
          }

          #nd-docs-layout article a {
            color: rgb(67 56 202);
          }

          #nd-docs-layout article a:hover {
            color: rgb(79 70 229);
          }

          /* Badges / pills with subtle glass effect */
          #nd-docs-layout article .badge,
          #nd-docs-layout article [data-badge],
          #nd-docs-layout article kbd {
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.62);
            border: 1px solid rgba(161, 161, 170, 0.35);
            border-radius: 0.6rem;
            box-shadow: 0 8px 20px -18px rgba(24, 24, 27, 0.25);
          }

          /* Code blocks - clean solid style */
          #nd-docs-layout article pre,
          #nd-docs-layout article [data-rehype-pretty-code-fragment] pre {
            background: #ffffff;
            border: 1px solid rgb(228 228 231);
            border-radius: 0.85rem;
            box-shadow: 0 8px 22px -20px rgba(24, 24, 27, 0.14);
            color: rgb(39 39 42);
            overflow-x: auto;
          }

          #nd-docs-layout article pre code,
          #nd-docs-layout article [data-rehype-pretty-code-fragment] pre code {
            background: transparent !important;
            color: inherit;
            font-size: 0.92rem;
            line-height: 1.6;
          }

          #nd-docs-layout article [data-rehype-pretty-code-fragment] {
            border-radius: 0.85rem;
          }

          /* Copy button: one neutral color */
          #nd-docs-layout article pre button {
            background: rgb(250 250 250);
            border: 1px solid rgb(228 228 231);
            border-radius: 0.45rem;
            color: rgb(82 82 91);
            box-shadow: none;
          }

          #nd-docs-layout article pre button:hover {
            background: rgb(244 244 245);
            color: rgb(39 39 42);
            border-color: rgb(212 212 216);
          }

          /* Two-color style only for language/file tabs */
          #nd-docs-layout article [role='tablist'] {
            background: rgb(244 244 245);
            border: 1px solid rgb(228 228 231);
            border-radius: 0.65rem;
            padding: 0.2rem;
          }

          #nd-docs-layout article [role='tablist'] [role='tab'] {
            border-radius: 0.5rem;
            color: rgb(82 82 91);
            transition: all 160ms ease;
          }

          #nd-docs-layout article [role='tablist'] [role='tab'][data-state='active'] {
            background: #ffffff;
            color: rgb(67 56 202);
            box-shadow: 0 1px 2px rgba(24, 24, 27, 0.06);
          }

          #nd-docs-layout article :not(pre) > code {
            background: rgb(244 244 245);
            border: 1px solid rgb(228 228 231);
            border-radius: 0.45rem;
            color: rgb(63 63 70);
            padding: 0.12rem 0.38rem;
          }

          /* Tables - clean and light */
          #nd-docs-layout article table {
            border: 1px solid rgb(228 228 231);
            border-radius: 0.85rem;
            border-collapse: separate;
            border-spacing: 0;
            overflow: hidden;
            width: 100%;
            background: #ffffff;
          }

          #nd-docs-layout article thead th {
            background: rgb(250 250 250);
            color: rgb(39 39 42);
            font-weight: 600;
            border-bottom: 1px solid rgb(228 228 231);
          }

          #nd-docs-layout article th,
          #nd-docs-layout article td {
            border-right: 1px solid rgb(237 237 240);
            padding: 0.75rem 0.85rem;
            text-align: left;
            vertical-align: top;
            color: rgb(63 63 70);
          }

          #nd-docs-layout article th:last-child,
          #nd-docs-layout article td:last-child {
            border-right: none;
          }

          #nd-docs-layout article tbody tr:not(:last-child) td {
            border-bottom: 1px solid rgb(237 237 240);
          }

          #nd-docs-layout article tbody tr:hover td {
            background: rgb(252 252 252);
          }

          /* "On this page" in purple */
          #nd-docs-layout nav[aria-label="Table of contents"] ul,
          #nd-docs-layout [data-toc-popover] nav ul {
            border-left: 1px solid rgba(101, 92, 207, 0.42);
            margin-left: 0.35rem;
            padding-left: 0.7rem;
          }

          #nd-docs-layout nav[aria-label="Table of contents"] a,
          #nd-docs-layout [data-toc-popover] nav a {
            border-radius: 0.5rem;
            color: rgb(75 85 99);
            display: block;
            margin: 0.08rem 0;
            padding: 0.3rem 0.55rem;
            transition: all 160ms ease;
          }

          #nd-docs-layout nav[aria-label="Table of contents"] a[data-active="true"],
          #nd-docs-layout [data-toc-popover] nav a[data-active="true"] {
            background: linear-gradient(90deg, rgba(101, 92, 207, 0.18), rgba(80, 122, 254, 0.1));
            color: rgb(95 75 208);
            font-weight: 600;
          }

          #nd-docs-layout nav[aria-label="Table of contents"] a:hover,
          #nd-docs-layout [data-toc-popover] nav a:hover {
            color: rgb(88 72 191);
          }

          /* Dark mode */
          .dark #nd-docs-layout {
            background:
              radial-gradient(1200px 560px at 14% -180px, rgba(140, 125, 255, 0.1), transparent 66%),
              radial-gradient(900px 430px at 88% -190px, rgba(101, 92, 207, 0.08), transparent 68%),
              linear-gradient(to bottom, #262626 0%, #232323 40%, #212121 100%);
            color: rgb(226 232 240);
          }

          .dark #nd-subnav {
            background: rgba(23, 23, 23, 0.86);
            border-bottom: 1px solid rgba(82, 82, 91, 0.45);
          }

          .dark #nd-docs-layout aside {
            background: #171717;
            border-right: 1px solid rgba(82, 82, 91, 0.45);
          }

          .dark #nd-docs-layout aside a {
            color: rgb(203 213 225);
          }

          .dark #nd-docs-layout aside a:hover {
            background: rgba(255, 255, 255, 0.08);
            color: rgb(244 244 245);
          }

          .dark #nd-docs-layout aside a[data-active="true"] {
            background: linear-gradient(90deg, rgba(140, 125, 255, 0.3), rgba(101, 92, 207, 0.22));
            color: rgb(250 250 250);
          }

          .dark #nd-docs-layout article h1,
          .dark #nd-docs-layout article h2,
          .dark #nd-docs-layout article h3,
          .dark #nd-docs-layout article h4 {
            color: rgb(244 244 245) !important;
          }

          .dark #nd-docs-layout article a {
            color: rgb(167 139 250);
          }

          .dark #nd-docs-layout article a:hover {
            color: rgb(196 181 253);
          }

          .dark #nd-docs-layout article pre,
          .dark #nd-docs-layout article [data-rehype-pretty-code-fragment] pre {
            background: #191919;
            border: 1px solid rgba(113, 113, 122, 0.38);
            box-shadow: 0 10px 26px -24px rgba(0, 0, 0, 0.58);
            color: rgb(226 232 240);
          }

          .dark #nd-docs-layout article pre button {
            background: rgba(48, 48, 52, 0.72);
            border: 1px solid rgba(113, 113, 122, 0.45);
            color: rgb(228 228 231);
          }

          .dark #nd-docs-layout article pre button:hover {
            background: rgba(72, 72, 78, 0.8);
            color: rgb(241 245 249);
            border-color: rgba(161, 161, 170, 0.6);
          }

          .dark #nd-docs-layout article .badge,
          .dark #nd-docs-layout article [data-badge],
          .dark #nd-docs-layout article kbd {
            background: rgba(39, 39, 42, 0.5);
            border: 1px solid rgba(113, 113, 122, 0.6);
            box-shadow: none;
          }

          .dark #nd-docs-layout article [role='tablist'] {
            background: rgba(39, 39, 42, 0.7);
            border: 1px solid rgba(113, 113, 122, 0.55);
          }

          .dark #nd-docs-layout article [role='tablist'] [role='tab'] {
            color: rgb(212 212 216);
          }

          .dark #nd-docs-layout article [role='tablist'] [role='tab'][data-state='active'] {
            background: rgba(23, 23, 23, 0.95);
            color: rgb(244 244 245);
          }

          .dark #nd-docs-layout article :not(pre) > code {
            background: rgba(63, 63, 70, 0.55);
            border: 1px solid rgba(113, 113, 122, 0.6);
            color: rgb(228 228 231);
          }

          .dark #nd-docs-layout article table {
            background: rgba(31, 31, 31, 0.75);
            border: 1px solid rgba(113, 113, 122, 0.5);
          }

          .dark #nd-docs-layout article thead th {
            background: rgba(39, 39, 42, 0.65);
            color: rgb(244 244 245);
            border-bottom: 1px solid rgba(113, 113, 122, 0.5);
          }

          .dark #nd-docs-layout article th,
          .dark #nd-docs-layout article td {
            color: rgb(212 212 216);
            border-right: 1px solid rgba(82, 82, 91, 0.55);
          }

          .dark #nd-docs-layout article tbody tr:not(:last-child) td {
            border-bottom: 1px solid rgba(82, 82, 91, 0.55);
          }

          .dark #nd-docs-layout article tbody tr:hover td {
            background: rgba(39, 39, 42, 0.38);
          }

          .dark #nd-docs-layout nav[aria-label="Table of contents"] ul,
          .dark #nd-docs-layout [data-toc-popover] nav ul {
            border-left: 1px solid rgba(113, 113, 122, 0.55);
          }

          .dark #nd-docs-layout nav[aria-label="Table of contents"] a,
          .dark #nd-docs-layout [data-toc-popover] nav a {
            color: rgb(203 213 225);
          }

          .dark #nd-docs-layout nav[aria-label="Table of contents"] a[data-active="true"],
          .dark #nd-docs-layout [data-toc-popover] nav a[data-active="true"] {
            background: linear-gradient(90deg, rgba(140, 125, 255, 0.28), rgba(101, 92, 207, 0.2));
            color: rgb(244 244 245);
          }
        `,
      }}
    />
  );
}

export default DocumentationV2Layout;
