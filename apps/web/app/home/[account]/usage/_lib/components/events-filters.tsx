'use client';

import { useCallback, useMemo, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Bot, Boxes, Check, Search, UserRound } from 'lucide-react';

import { AccountDataTableFilters } from '../../../_components/data-table';
import { Input } from '@kit/ui/input';

function normalizeList(value: string | null): string[] {
  return value
    ? value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    : [];
}

function MultiSelectList(props: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [localSearch, setLocalSearch] = useState('');
  const normalizedQuery = localSearch.trim().toLowerCase();
  const visibleOptions =
    normalizedQuery.length > 0
      ? props.options.filter((o) => o.toLowerCase().includes(normalizedQuery))
      : props.options;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Filtrar..."
          className="h-9 rounded-lg pl-9"
        />
      </div>

      <div className="max-h-48 space-y-1 overflow-auto">
        {visibleOptions.map((option) => {
          const isSelected = props.selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => props.onToggle(option)}
              className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm"
            >
              <span
                className="border-border bg-background flex h-4 w-4 items-center justify-center rounded border"
                aria-hidden
              >
                {isSelected ? <Check className="h-3 w-3" /> : null}
              </span>
              <span className="truncate">{option}</span>
            </button>
          );
        })}
        {visibleOptions.length === 0 ? (
          <p className="text-muted-foreground px-2 py-1 text-sm">
            Nenhum resultado
          </p>
        ) : null}
      </div>
    </div>
  );
}

function formatGroupedLabel(prefix: string, values: string[]) {
  if (values.length === 0) return '';
  if (values.length > 2) return `${prefix}: ${values.length} selecionados`;
  return `${prefix}: ${values.join(', ')}`;
}

export function EventsFilters(props: {
  models: string[];
  features: string[];
  userIds: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setMultiFilter = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.length > 0) {
        params.set(key, values.join(','));
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const toggleMultiFilter = useCallback(
    (key: string, value: string) => {
      const currentValues = normalizeList(searchParams.get(key));
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      setMultiFilter(key, nextValues);
    },
    [searchParams, setMultiFilter],
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('model');
    params.delete('feature');
    params.delete('userId');
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const currentModels = normalizeList(searchParams.get('model'));
  const currentFeatures = normalizeList(searchParams.get('feature'));
  const currentUserIds = normalizeList(searchParams.get('userId'));

  const activeItems = useMemo(() => {
    const items: Array<{ id: string; label: string; onRemove: () => void }> = [];

    if (currentModels.length > 0) {
      items.push({
        id: 'model',
        label: formatGroupedLabel('Model', currentModels),
        onRemove: () => setMultiFilter('model', []),
      });
    }

    if (currentFeatures.length > 0) {
      items.push({
        id: 'feature',
        label: formatGroupedLabel('Feature', currentFeatures),
        onRemove: () => setMultiFilter('feature', []),
      });
    }

    if (currentUserIds.length > 0) {
      items.push({
        id: 'userId',
        label: formatGroupedLabel('User', currentUserIds),
        onRemove: () => setMultiFilter('userId', []),
      });
    }

    return items;
  }, [
    currentFeatures,
    currentModels,
    currentUserIds,
    setMultiFilter,
  ]);

  const panelItems = useMemo(
    () => [
      {
        id: 'model',
        label: 'Model',
        icon: <Bot className="h-4 w-4" />,
        activeCount: currentModels.length,
        onClear: () => setMultiFilter('model', []),
        content: (
          <MultiSelectList
            options={props.models}
            selected={currentModels}
            onToggle={(v) => toggleMultiFilter('model', v)}
          />
        ),
      },
      {
        id: 'feature',
        label: 'Feature',
        icon: <Boxes className="h-4 w-4" />,
        activeCount: currentFeatures.length,
        onClear: () => setMultiFilter('feature', []),
        content: (
          <MultiSelectList
            options={props.features}
            selected={currentFeatures}
            onToggle={(v) => toggleMultiFilter('feature', v)}
          />
        ),
      },
      {
        id: 'userId',
        label: 'Proprietario',
        icon: <UserRound className="h-4 w-4" />,
        activeCount: currentUserIds.length,
        onClear: () => setMultiFilter('userId', []),
        content: (
          <MultiSelectList
            options={props.userIds}
            selected={currentUserIds}
            onToggle={(v) => toggleMultiFilter('userId', v)}
          />
        ),
      },
    ],
    [
      currentFeatures,
      currentModels,
      currentUserIds,
      props.features,
      props.models,
      props.userIds,
      toggleMultiFilter,
    ],
  );

  return (
    <AccountDataTableFilters
      activeItems={activeItems}
      items={panelItems}
      onClearAll={clearAllFilters}
    >
      {null}
    </AccountDataTableFilters>
  );
}
