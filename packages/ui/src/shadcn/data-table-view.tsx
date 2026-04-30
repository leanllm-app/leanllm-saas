'use client';

import * as React from 'react';

import type {
  ColumnDef,
  PaginationState,
  Row,
  SortingState,
  Table as TanstackTable,
} from '@tanstack/react-table';
import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
} from 'lucide-react';

import { cn } from '../lib/utils';
import { Trans } from '../makerkit/trans';
import { Button } from './button';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

export type DataTablePaginationOptions = {
  defaultPageSize?: number;
  pageSizeOptions?: number[];
};

export type DataTableViewProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Enables search input; text is matched with `includes` (case-insensitive). */
  getSearchText?: (row: TData) => string;
  searchPlaceholder?: string;
  /** Enable client-side pagination (default: true). Pass `false` to show all rows. */
  pagination?: boolean | DataTablePaginationOptions;
  /** Enable header sorting where the column allows it. */
  enableSorting?: boolean;
  /** Extra controls aligned with the search row (e.g. filters). */
  toolbarEnd?: React.ReactNode;
  /** Row click handler (e.g. open details dialog). */
  onRowClick?: (row: TData) => void;
  /** Wrapper around the whole block */
  className?: string;
  /** Table container (border / radius) */
  tableContainerClassName?: string;
  /** When `data` is empty */
  emptyMessage?: React.ReactNode;
  /** When `data` has rows but search filters everything out */
  noResultsMessage?: React.ReactNode;
};

const defaultPageSizes = [10, 20, 50];

function getPaginationConfig(
  pagination: DataTableViewProps<unknown, unknown>['pagination'],
): {
  enabled: boolean;
  defaultPageSize: number;
  pageSizeOptions: number[];
} {
  if (pagination === false) {
    return { enabled: false, defaultPageSize: 10, pageSizeOptions: defaultPageSizes };
  }
  if (pagination === true || pagination === undefined) {
    return {
      enabled: true,
      defaultPageSize: 10,
      pageSizeOptions: defaultPageSizes,
    };
  }
  return {
    enabled: true,
    defaultPageSize: pagination.defaultPageSize ?? 10,
    pageSizeOptions: pagination.pageSizeOptions ?? defaultPageSizes,
  };
}

export function DataTableView<TData, TValue = unknown>(
  props: DataTableViewProps<TData, TValue>,
) {
  const {
    columns,
    data,
    getSearchText,
    searchPlaceholder = 'Search…',
    pagination: paginationProp,
    enableSorting = false,
    toolbarEnd,
    onRowClick,
    className,
    tableContainerClassName,
    emptyMessage,
    noResultsMessage,
  } = props;

  const { enabled: paginationEnabled, defaultPageSize, pageSizeOptions } =
    getPaginationConfig(paginationProp);

  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [globalFilter, data]);

  const globalFilterFn = React.useMemo(() => {
    if (!getSearchText) {
      return undefined;
    }
    return (
      row: Row<TData>,
      _columnId: string,
      filterValue: unknown,
    ): boolean => {
      const q = String(filterValue ?? '')
        .trim()
        .toLowerCase();
      if (!q) {
        return true;
      }
      return getSearchText(row.original).toLowerCase().includes(q);
    };
  }, [getSearchText]);

  const table = useReactTable({
    data,
    columns,
    state: {
      ...(getSearchText ? { globalFilter } : {}),
      ...(enableSorting ? { sorting } : {}),
      ...(paginationEnabled ? { pagination } : {}),
    },
    ...(getSearchText
      ? {
          onGlobalFilterChange: setGlobalFilter,
          globalFilterFn,
          getFilteredRowModel: getFilteredRowModel(),
        }
      : {}),
    ...(paginationEnabled
      ? {
          onPaginationChange: setPagination,
          getPaginationRowModel: getPaginationRowModel(),
        }
      : {}),
    ...(enableSorting
      ? {
          onSortingChange: setSorting,
          getSortedRowModel: getSortedRowModel(),
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
  });

  const totalFiltered = getSearchText
    ? table.getFilteredRowModel().rows.length
    : table.getCoreRowModel().rows.length;

  const rows = table.getRowModel().rows;

  const showToolbar = Boolean(getSearchText) || Boolean(toolbarEnd);

  const pageIndex = paginationEnabled
    ? table.getState().pagination.pageIndex
    : 0;
  const pageSize = paginationEnabled
    ? table.getState().pagination.pageSize
    : totalFiltered;
  const from = totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalFiltered);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {showToolbar ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {getSearchText ? (
            <div className="relative min-w-0 sm:w-full sm:max-w-sm">
              <Search
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                aria-hidden
              />
              <Input
                type="search"
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                className="border-border bg-background h-9 rounded-lg pl-9"
                data-test="data-table-search"
              />
            </div>
          ) : null}
          {toolbarEnd ? (
            <div className="flex min-w-0 flex-wrap items-center gap-2 sm:ml-auto sm:justify-end">
              {toolbarEnd}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          'border-border overflow-x-auto rounded-lg border',
          tableContainerClassName,
        )}
      >
        {data.length === 0 ? (
          <div className="text-muted-foreground flex min-h-[200px] items-center justify-center px-4 py-12 text-center text-sm">
            {emptyMessage ?? (
              <span>
                <Trans i18nKey={'common:noData'} />
              </span>
            )}
          </div>
        ) : totalFiltered === 0 ? (
          <div className="text-muted-foreground flex min-h-[200px] items-center justify-center px-4 py-12 text-center text-sm">
            {noResultsMessage ??
              'No results match your search or filters.'}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/70 dark:bg-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="h-12 border-slate-200/80 hover:bg-transparent dark:border-white/10"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground h-12 px-4 text-sm font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : (() => {
                            const canSort =
                              enableSorting && header.column.getCanSort();
                            const sorted = header.column.getIsSorted();

                            return (
                              <div
                                onClick={
                                  canSort
                                    ? () => header.column.toggleSorting()
                                    : undefined
                                }
                                className={cn(
                                  'flex items-center gap-1.5',
                                  canSort && 'cursor-pointer select-none',
                                )}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                                {canSort ? (
                                  <span className="inline-flex flex-col">
                                    <ChevronUp
                                      className={cn(
                                        'h-3 w-3',
                                        sorted === 'asc'
                                          ? 'text-foreground'
                                          : 'text-muted-foreground/40',
                                      )}
                                    />
                                    <ChevronDown
                                      className={cn(
                                        '-mt-1 h-3 w-3',
                                        sorted === 'desc'
                                          ? 'text-foreground'
                                          : 'text-muted-foreground/40',
                                      )}
                                    />
                                  </span>
                                ) : null}
                              </div>
                            );
                          })()}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-row-id={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('h-12', onRowClick && 'cursor-pointer')}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {paginationEnabled && data.length > 0 && totalFiltered > 0 ? (
        <DataTablePaginationBar
          table={table}
          from={from}
          to={to}
          total={totalFiltered}
          pageSizeOptions={pageSizeOptions}
        />
      ) : null}
    </div>
  );
}

function DataTablePaginationBar<TData>(props: {
  table: TanstackTable<TData>;
  from: number;
  to: number;
  total: number;
  pageSizeOptions: number[];
}) {
  const { table, from, to, total, pageSizeOptions } = props;
  const pageCount = Math.max(table.getPageCount(), 1);

  return (
    <div className="text-muted-foreground mt-1 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="tabular-nums">
        Showing <span className="text-foreground font-semibold">{from}</span>–
        <span className="text-foreground font-semibold">{to}</span> of{' '}
        <span className="text-foreground font-semibold">{total}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm font-medium">
            Rows
          </span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(v) => {
              table.setPageSize(Number(v));
            }}
          >
            <SelectTrigger className="bg-background h-8 w-[4.5rem] rounded-md shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-foreground min-w-[5.5rem] text-center text-sm font-medium tabular-nums">
            Page {table.getState().pagination.pageIndex + 1} / {pageCount}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
