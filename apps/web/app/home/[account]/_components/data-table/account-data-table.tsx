'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTableView } from '@kit/ui/data-table-view';

function AccountDataTableToolbar(props: {
  filters?: ReactNode;
  actions?: ReactNode;
}) {
  if (!props.filters && !props.actions) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:gap-2.5">
      {props.filters}
      {props.actions}
    </div>
  );
}

export type AccountDataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  tableContainerClassName?: string;
  noResultsMessage?: ReactNode;
  emptyMessage?: ReactNode;
  pagination?: boolean | { defaultPageSize?: number; pageSizeOptions?: number[] };
  enableSorting?: boolean;
  onRowClick?: (row: TData) => void;
  search?: {
    getSearchText: (row: TData) => string;
    placeholder?: string;
  };
  filters?: ReactNode;
  actions?: ReactNode;
};

export function AccountDataTable<TData, TValue = unknown>(
  props: AccountDataTableProps<TData, TValue>,
) {
  const toolbarEnd = useMemo(
    () => (
      <AccountDataTableToolbar filters={props.filters} actions={props.actions} />
    ),
    [props.actions, props.filters],
  );

  return (
    <DataTableView
      columns={props.columns}
      data={props.data}
      className={props.className}
      tableContainerClassName={props.tableContainerClassName}
      noResultsMessage={props.noResultsMessage}
      emptyMessage={props.emptyMessage}
      pagination={props.pagination}
      enableSorting={props.enableSorting}
      onRowClick={props.onRowClick}
      getSearchText={props.search?.getSearchText}
      searchPlaceholder={props.search?.placeholder}
      toolbarEnd={toolbarEnd}
    />
  );
}
