'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { ChevronRight, Plus, Search, X } from 'lucide-react';

import { Button } from '@kit/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@kit/ui/collapsible';
import { Input } from '@kit/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@kit/ui/popover';

type ActiveFilterItem = {
  id: string;
  label: string;
  onRemove: () => void;
};

type FilterPanelItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  activeCount?: number;
  onClear?: () => void;
  content: ReactNode;
};

export function AccountDataTableFilters(props: {
  activeItems: ActiveFilterItem[];
  items?: FilterPanelItem[];
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  searchPlaceholder?: string;
  onClearAll?: () => void;
  children: ReactNode;
}) {
  const activeCount = props.activeItems.length;
  const [localSearchValue, setLocalSearchValue] = useState('');
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const searchValue = props.searchValue ?? localSearchValue;
  const showPanelSearch =
    props.searchValue !== undefined ||
    props.onSearchValueChange !== undefined ||
    props.searchPlaceholder !== undefined;

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-9 cursor-pointer rounded-xl border border-solid px-3.5"
            >
              <Plus className="mr-2 h-4 w-4 text-slate-600" />
              Filtros
              {activeCount > 0 ? (
                <span className="bg-muted ml-2 rounded-md px-1.5 py-0.5 text-xs font-semibold">
                  {activeCount}
                </span>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[min(92vw,20rem)] max-h-[70vh] overflow-y-auto rounded-xl p-2.5 shadow-md"
          >
            <div className="space-y-2.5">
              {showPanelSearch ? (
                <div className="relative">
                  <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    value={searchValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocalSearchValue(value);
                      props.onSearchValueChange?.(value);
                    }}
                    placeholder={props.searchPlaceholder ?? 'Filtrar...'}
                    className="h-9 rounded-lg pl-9"
                  />
                </div>
              ) : null}
              {props.items && props.items.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {props.items.map((item) => (
                    <Collapsible
                      key={item.id}
                      open={openItemId === item.id}
                      onOpenChange={(isOpen) =>
                        setOpenItemId(isOpen ? item.id : null)
                      }
                      className="border-border rounded-lg border"
                    >
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left"
                        >
                          <span className="text-muted-foreground">
                            {item.icon}
                          </span>
                          <span className="flex-1 text-sm font-medium">
                            {item.label}
                          </span>
                          {item.activeCount && item.activeCount > 0 ? (
                            <span className="bg-muted rounded-md px-1.5 py-0.5 text-xs font-semibold">
                              {item.activeCount}
                            </span>
                          ) : null}
                          {item.onClear && item.activeCount && item.activeCount > 0 ? (
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                item.onClear?.();
                              }}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  item.onClear?.();
                                }
                              }}
                              className="text-muted-foreground hover:text-foreground px-1.5 text-xs font-medium"
                            >
                              Limpar
                            </span>
                          ) : null}
                          <ChevronRight
                            className="text-muted-foreground h-4 w-4 transition-transform data-[state=open]:rotate-90"
                            data-state={openItemId === item.id ? 'open' : 'closed'}
                          />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-2.5 pb-2.5">
                        {item.content}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">{props.children}</div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {props.activeItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onRemove}
            className="border-border bg-background hover:bg-muted inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm"
          >
            <span>{item.label}</span>
            <X className="h-3.5 w-3.5" />
          </button>
        ))}

        {activeCount > 0 && props.onClearAll ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg"
            onClick={props.onClearAll}
            aria-label="Limpar filtros"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
    </div>
  );
}
