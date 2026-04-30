'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@kit/ui/badge';

import type { Json } from '~/lib/database.types';

export type Event = {
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

function hashToHue(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

function getModelBadgeStyle(model: string) {
  const hue = hashToHue(model);

  return {
    borderColor: `hsla(${hue}, 85%, 55%, 0.28)`,
    backgroundColor: `hsla(${hue}, 90%, 55%, 0.05)`,
    color: `hsl(${hue}, 65%, 45%)`,
  };
}

export function getEventsColumns(): ColumnDef<Event>[] {
  return [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      enableSorting: true,
      cell: ({ row }) => {
        const d = new Date(row.original.timestamp);
        return (
          <span className={'text-sm'}>
            {d.toLocaleDateString()} {d.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: 'model',
      header: 'Model',
      enableSorting: true,
      cell: ({ row }) => (
        <Badge
          className="border font-medium shadow-none backdrop-blur-[1px]"
          style={getModelBadgeStyle(row.original.model)}
          variant={'outline'}
        >
          {row.original.model}
        </Badge>
      ),
    },
    {
      accessorKey: 'feature',
      header: 'Feature',
      enableSorting: false,
      cell: ({ row }) => row.original.feature ?? '-',
    },
    {
      accessorKey: 'user_id',
      header: 'User ID',
      enableSorting: false,
      cell: ({ row }) => (
        <span className={'text-muted-foreground text-sm'}>
          {row.original.user_id ?? '-'}
        </span>
      ),
    },
    {
      accessorKey: 'total_tokens',
      header: 'Tokens',
      enableSorting: true,
      cell: ({ row }) => (row.original.total_tokens ?? 0).toLocaleString(),
    },
    {
      accessorKey: 'cost_usd',
      header: 'Cost',
      enableSorting: true,
      cell: ({ row }) => `$${(row.original.cost_usd ?? 0).toFixed(6)}`,
    },
    {
      accessorKey: 'latency_ms',
      header: 'Latency',
      enableSorting: true,
      cell: ({ row }) => `${(row.original.latency_ms ?? 0).toLocaleString()}ms`,
    },
  ];
}
