'use client';

import { useMemo, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { CreateKeyDialog } from './create-key-dialog';
import { AccountDataTable } from '../../../_components/data-table';
import { ApiKeyRecord, getApiKeysColumns } from './api-keys-columns';

type StatusFilter = 'all' | 'active' | 'revoked';

export function ApiKeysTable(props: { accountId: string; data: ApiKeyRecord[] }) {
  const columns = useMemo(() => getApiKeysColumns(), []);
  const [status, setStatus] = useState<StatusFilter>('all');

  const rowsForTable = useMemo(() => {
    if (status === 'active') {
      return props.data.filter((k) => k.is_active);
    }
    if (status === 'revoked') {
      return props.data.filter((k) => !k.is_active);
    }
    return props.data;
  }, [props.data, status]);

  const filters = (
    <Select
      value={status}
      onValueChange={(v) => setStatus(v as StatusFilter)}
    >
      <SelectTrigger
        className="border-border bg-background h-9 w-full min-w-44 rounded-lg sm:w-auto sm:min-w-48"
        data-test="api-keys-filter-status"
      >
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="revoked">Revoked</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <AccountDataTable
      columns={columns}
      data={rowsForTable}
      search={{
        getSearchText: (k) => `${k.name} ${k.key_prefix}`,
        placeholder: 'Search by name or key…',
      }}
      pagination={{
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50],
      }}
      filters={filters}
      actions={<CreateKeyDialog accountId={props.accountId} />}
      noResultsMessage="No keys match your search or filters."
    />
  );
}
