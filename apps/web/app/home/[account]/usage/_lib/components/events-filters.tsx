'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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

function toStableParam(values: string[]) {
  return [...new Set(values)].sort().join(',');
}

export function EventsFilters(props: {
  models: string[];
  features: string[];
  userIds: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentModels = normalizeList(searchParams.get('model'));
  const currentFeatures = normalizeList(searchParams.get('feature'));
  const currentUserIds = normalizeList(searchParams.get('userId'));
  const [selectedModels, setSelectedModels] = useState<string[]>(currentModels);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(currentFeatures);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(currentUserIds);

  const currentSignature = useMemo(
    () =>
      `${toStableParam(currentModels)}|${toStableParam(currentFeatures)}|${toStableParam(currentUserIds)}`,
    [currentFeatures, currentModels, currentUserIds],
  );
  const selectedSignature = useMemo(
    () =>
      `${toStableParam(selectedModels)}|${toStableParam(selectedFeatures)}|${toStableParam(selectedUserIds)}`,
    [selectedFeatures, selectedModels, selectedUserIds],
  );

  useEffect(() => {
    setSelectedModels(currentModels);
    setSelectedFeatures(currentFeatures);
    setSelectedUserIds(currentUserIds);
  }, [currentSignature]);

  const applyFiltersToUrl = useCallback(
    (next: { models: string[]; features: string[]; userIds: string[] }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.models.length > 0) {
        params.set('model', next.models.join(','));
      } else {
        params.delete('model');
      }
      if (next.features.length > 0) {
        params.set('feature', next.features.join(','));
      } else {
        params.delete('feature');
      }
      if (next.userIds.length > 0) {
        params.set('userId', next.userIds.join(','));
      } else {
        params.delete('userId');
      }
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (selectedSignature === currentSignature) {
      return;
    }

    const timer = window.setTimeout(() => {
      applyFiltersToUrl({
        models: selectedModels,
        features: selectedFeatures,
        userIds: selectedUserIds,
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [
    applyFiltersToUrl,
    currentSignature,
    selectedFeatures,
    selectedModels,
    selectedSignature,
    selectedUserIds,
  ]);

  const toggleMultiFilter = useCallback((key: 'model' | 'feature' | 'userId', value: string) => {
    const update = (values: string[]) =>
      values.includes(value) ? values.filter((v) => v !== value) : [...values, value];

    if (key === 'model') {
      setSelectedModels((prev) => update(prev));
      return;
    }
    if (key === 'feature') {
      setSelectedFeatures((prev) => update(prev));
      return;
    }
    setSelectedUserIds((prev) => update(prev));
  }, []);

  const clearFilter = useCallback((key: 'model' | 'feature' | 'userId') => {
    if (key === 'model') {
      setSelectedModels([]);
      return;
    }
    if (key === 'feature') {
      setSelectedFeatures([]);
      return;
    }
    setSelectedUserIds([]);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedModels([]);
    setSelectedFeatures([]);
    setSelectedUserIds([]);
  }, []);

  const activeItems = useMemo(() => {
    const items: Array<{ id: string; label: string; onRemove: () => void }> = [];

    if (currentModels.length > 0) {
      items.push({
        id: 'model',
        label: formatGroupedLabel('Model', currentModels),
        onRemove: () => clearFilter('model'),
      });
    }

    if (currentFeatures.length > 0) {
      items.push({
        id: 'feature',
        label: formatGroupedLabel('Feature', currentFeatures),
        onRemove: () => clearFilter('feature'),
      });
    }

    if (currentUserIds.length > 0) {
      items.push({
        id: 'userId',
        label: formatGroupedLabel('User', currentUserIds),
        onRemove: () => clearFilter('userId'),
      });
    }

    return items;
  }, [
    currentFeatures,
    currentModels,
    currentUserIds,
    clearFilter,
  ]);

  const panelItems = useMemo(
    () => [
      {
        id: 'model',
        label: 'Model',
        icon: <Bot className="h-4 w-4" />,
        activeCount: selectedModels.length,
        onClear: () => clearFilter('model'),
        content: (
          <MultiSelectList
            options={props.models}
            selected={selectedModels}
            onToggle={(v) => toggleMultiFilter('model', v)}
          />
        ),
      },
      {
        id: 'feature',
        label: 'Feature',
        icon: <Boxes className="h-4 w-4" />,
        activeCount: selectedFeatures.length,
        onClear: () => clearFilter('feature'),
        content: (
          <MultiSelectList
            options={props.features}
            selected={selectedFeatures}
            onToggle={(v) => toggleMultiFilter('feature', v)}
          />
        ),
      },
      {
        id: 'userId',
        label: 'Proprietario',
        icon: <UserRound className="h-4 w-4" />,
        activeCount: selectedUserIds.length,
        onClear: () => clearFilter('userId'),
        content: (
          <MultiSelectList
            options={props.userIds}
            selected={selectedUserIds}
            onToggle={(v) => toggleMultiFilter('userId', v)}
          />
        ),
      },
    ],
    [
      clearFilter,
      props.features,
      props.models,
      props.userIds,
      selectedFeatures,
      selectedModels,
      selectedUserIds,
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
