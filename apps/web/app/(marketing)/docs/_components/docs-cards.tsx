import { Cms } from '@kit/cms';

import { DocsCard } from './docs-card';

export function DocsCards({ cards }: { cards: Cms.ContentItem[] }) {
  const cardsSortedByOrder = [...cards].sort((a, b) => a.order - b.order);

  return (
    <div className={'grid w-full grid-cols-1 gap-4 md:grid-cols-2'}>
      {cardsSortedByOrder.map((item) => {
        return (
          <DocsCard
            key={item.title}
            title={item.title}
            subtitle={item.description}
            link={{
              url: `/docs/${item.slug}`,
            }}
          />
        );
      })}
    </div>
  );
}
