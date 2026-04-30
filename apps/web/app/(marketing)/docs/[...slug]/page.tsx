import { cache } from 'react';

import { notFound } from 'next/navigation';

import { ContentRenderer, createCmsClient } from '@kit/cms';
import { If } from '@kit/ui/if';
import { Separator } from '@kit/ui/separator';
import { cn } from '@kit/ui/utils';

import { withI18n } from '~/lib/i18n/with-i18n';

// local imports
import { DocsCards } from '../_components/docs-cards';

const getPageBySlug = cache(pageLoader);

interface DocumentationPageProps {
  params: Promise<{ slug: string[] }>;
}

async function pageLoader(slug: string) {
  const client = await createCmsClient();

  return client.getContentItemBySlug({ slug, collection: 'documentation' });
}

export const generateMetadata = async ({ params }: DocumentationPageProps) => {
  const slug = (await params).slug.join('/');
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const { title, description } = page;

  return {
    title,
    description,
  };
};

async function DocumentationPage({ params }: DocumentationPageProps) {
  const slug = (await params).slug.join('/');
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const description = page?.description ?? '';

  return (
    <div className={'flex flex-1 flex-col gap-y-8 pb-16'}>
      <div className={'w-full'}>
        <div className="mx-auto w-full max-w-4xl">
          <article className={cn('w-full space-y-8 rounded-xl border p-4 md:p-8')}>
            <section className={'flex flex-col gap-y-2 border-b border-dashed pb-6'}>
              <h1 className={'text-foreground text-3xl font-semibold tracking-tight'}>
                {page.title}
              </h1>

              <h2 className={'text-muted-foreground text-base md:text-lg'}>
                {description}
              </h2>
            </section>

            <div className={'markdoc'}>
              <ContentRenderer content={page.content} />
            </div>
          </article>
        </div>
      </div>

      <If condition={page.children.length > 0}>
        <Separator />

        <div className="mx-auto w-full max-w-4xl">
          <DocsCards cards={page.children ?? []} />
        </div>
      </If>
    </div>
  );
}

export default withI18n(DocumentationPage);
