'use client';

import { useState } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { Download } from 'lucide-react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import { DataTable } from '@kit/ui/enhanced-data-table';

import type { Json } from '~/lib/database.types';

type Event = {
  event_id: string;
  timestamp: string;
  model: string;
  provider: string;
  feature: string | null;
  user_id: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  total_tokens: number | null;
  cost_usd: number | null;
  latency_ms: number | null;
  labels: Json | null;
  metadata: Json | null;
  environment: string | null;
  prompt: string | null;
  response: string | null;
};

function getColumns(): ColumnDef<Event>[] {
  return [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => {
        const d = new Date(row.original.timestamp);
        return (
          <span className={'text-xs'}>
            {d.toLocaleDateString()} {d.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row }) => (
        <Badge variant={'outline'}>{row.original.model}</Badge>
      ),
    },
    {
      accessorKey: 'feature',
      header: 'Feature',
      cell: ({ row }) => row.original.feature ?? '-',
    },
    {
      accessorKey: 'user_id',
      header: 'User ID',
      cell: ({ row }) => (
        <span className={'text-muted-foreground text-xs'}>
          {row.original.user_id ?? '-'}
        </span>
      ),
    },
    {
      accessorKey: 'total_tokens',
      header: 'Tokens',
      cell: ({ row }) => (row.original.total_tokens ?? 0).toLocaleString(),
    },
    {
      accessorKey: 'cost_usd',
      header: 'Cost',
      cell: ({ row }) => `$${(row.original.cost_usd ?? 0).toFixed(6)}`,
    },
    {
      accessorKey: 'latency_ms',
      header: 'Latency',
      cell: ({ row }) => `${(row.original.latency_ms ?? 0).toLocaleString()}ms`,
    },
  ];
}

function EventDetailDialog(props: {
  event: Event | null;
  onClose: () => void;
}) {
  if (!props.event) return null;

  const e = props.event;

  return (
    <Dialog open={!!props.event} onOpenChange={() => props.onClose()}>
      <DialogContent className={'max-h-[80vh] max-w-2xl overflow-y-auto'}>
        <DialogHeader>
          <DialogTitle>Event Detail</DialogTitle>
        </DialogHeader>

        <div className={'space-y-4 text-sm'}>
          <Section title="General">
            <Row label="Event ID" value={e.event_id} />
            <Row
              label="Timestamp"
              value={new Date(e.timestamp).toISOString()}
            />
            <Row label="Model" value={e.model} />
            <Row label="Provider" value={e.provider} />
            <Row label="Feature" value={e.feature ?? '-'} />
            <Row label="User ID" value={e.user_id ?? '-'} />
            <Row label="Environment" value={e.environment ?? '-'} />
          </Section>

          <Section title="Usage">
            <Row label="Input Tokens" value={String(e.input_tokens ?? 0)} />
            <Row label="Output Tokens" value={String(e.output_tokens ?? 0)} />
            <Row label="Total Tokens" value={String(e.total_tokens ?? 0)} />
            <Row label="Cost" value={`$${(e.cost_usd ?? 0).toFixed(6)}`} />
            <Row label="Latency" value={`${e.latency_ms ?? 0}ms`} />
          </Section>

          {e.labels &&
            typeof e.labels === 'object' &&
            !Array.isArray(e.labels) &&
            Object.keys(e.labels).length > 0 && (
              <Section title="Labels">
                <pre
                  className={'bg-muted overflow-x-auto rounded-md p-3 text-xs'}
                >
                  {JSON.stringify(e.labels, null, 2)}
                </pre>
              </Section>
            )}

          {e.metadata &&
            typeof e.metadata === 'object' &&
            !Array.isArray(e.metadata) &&
            Object.keys(e.metadata).length > 0 && (
              <Section title="Metadata">
                <pre
                  className={'bg-muted overflow-x-auto rounded-md p-3 text-xs'}
                >
                  {JSON.stringify(e.metadata, null, 2)}
                </pre>
              </Section>
            )}

          {e.prompt && (
            <Section title="Prompt">
              <pre
                className={
                  'bg-muted max-h-48 overflow-y-auto rounded-md p-3 text-xs whitespace-pre-wrap'
                }
              >
                {e.prompt}
              </pre>
            </Section>
          )}

          {e.response && (
            <Section title="Response">
              <pre
                className={
                  'bg-muted max-h-48 overflow-y-auto rounded-md p-3 text-xs whitespace-pre-wrap'
                }
              >
                {e.response}
              </pre>
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        className={
          'text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase'
        }
      >
        {props.title}
      </h4>
      {props.children}
    </div>
  );
}

function Row(props: { label: string; value: string }) {
  return (
    <div className={'flex justify-between border-b py-1'}>
      <span className={'text-muted-foreground'}>{props.label}</span>
      <span className={'font-mono'}>{props.value}</span>
    </div>
  );
}

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
}) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const columns = getColumns();

  return (
    <>
      <div className={'mb-3 flex justify-end'}>
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => exportToCsv(props.data)}
          disabled={props.data.length === 0}
          data-test={'export-csv'}
        >
          <Download className={'mr-2 h-4 w-4'} />
          Export CSV
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={props.data}
        pageIndex={props.pageIndex}
        pageSize={25}
        pageCount={props.pageCount}
        onClick={({ row }) => setSelectedEvent(row.original)}
      />

      <EventDetailDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
