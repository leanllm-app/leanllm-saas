import { redirect } from 'next/navigation';

import { docsV2Source } from '~/lib/docs-v2/source';

export const metadata = {
  title: 'Documentation V2',
};

export default function DocsV2Page() {
  const firstPage = docsV2Source.getPages()[0];

  if (firstPage) {
    redirect(firstPage.url);
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-10">
      <h1 className="text-2xl font-semibold">Documentation V2</h1>
      <p className="text-muted-foreground mt-2">
        Nenhuma pagina encontrada em content/documentation-v2.
      </p>
    </div>
  );
}
