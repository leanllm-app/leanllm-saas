import { notFound } from 'next/navigation';

import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { docsV2Source } from '~/lib/docs-v2/source';

interface DocumentationPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({ params }: DocumentationPageProps) => {
  const slug = (await params).slug;
  const page = docsV2Source.getPage(slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
};

export function generateStaticParams() {
  return docsV2Source.generateParams();
}

async function DocumentationPage({ params }: DocumentationPageProps) {
  const slug = (await params).slug;
  const page = docsV2Source.getPage(slug);

  if (!page) {
    notFound();
  }

  const Content = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <Content components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export default DocumentationPage;
