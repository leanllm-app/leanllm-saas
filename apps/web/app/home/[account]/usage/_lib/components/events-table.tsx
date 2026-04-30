'use client';

import { useMemo, useState } from 'react';

import { Download } from 'lucide-react';

import { Button } from '@kit/ui/button';

import {
  AccountDataTable,
  AccountDataTableServerPagination,
} from '../../../_components/data-table';
import { Event, getEventsColumns } from './events-columns';
import { EventsDetailDialog } from './events-detail-dialog';
import { EventsFilters } from './events-filters';

function exportToCsv(events: Event[]) {
  const headers = [
    'timestamp',
    'model',
    'provider',
    'feature',
    'user_id',
    'input_tokens',
    'output_tokens',
    'total_tokens',
    'cost_usd',
    'latency_ms',
    'environment',
  ];

  const rows = events.map((e) =>
    [
      e.timestamp,
      e.model,
      e.provider,
      e.feature ?? '',
      e.user_id ?? '',
      e.input_tokens ?? 0,
      e.output_tokens ?? 0,
      e.total_tokens ?? 0,
      e.cost_usd ?? 0,
      e.latency_ms ?? 0,
      e.environment ?? '',
    ].join(','),
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `leanllm-events-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}

export function EventsTable(props: {
  data: Event[];
  pageIndex: number;
  pageCount: number;
  total: number;
  pageSize: number;
  models: string[];
  features: string[];
  userIds: string[];
}) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const columns = useMemo(() => getEventsColumns(), []);
  const actions = (
    <Button
      size={'sm'}
      variant={'outline'}
      className="cursor-pointer"
      onClick={() => exportToCsv(props.data)}
      disabled={props.data.length === 0}
      data-test={'export-csv'}
    >
      <Download className={'mr-2 h-4 w-4'} />
      Export CSV
    </Button>
  );

  return (
    <>
      <AccountDataTable
        columns={columns}
        data={props.data}
        pagination={false}
        enableSorting
        onRowClick={setSelectedEvent}
        search={{
          getSearchText: (e) =>
            `${e.model} ${e.provider} ${e.feature ?? ''} ${e.user_id ?? ''}`,
          placeholder: 'Search by model, provider, feature or user…',
        }}
        filters={
          <EventsFilters
            models={props.models}
            features={props.features}
            userIds={props.userIds}
          />
        }
        actions={actions}
      />
      <AccountDataTableServerPagination
        pageIndex={props.pageIndex}
        pageCount={props.pageCount}
        total={props.total}
        pageSize={props.pageSize}
      />

      <EventsDetailDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
