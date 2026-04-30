'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { usageEventsQueryKey } from '../usage-query-keys';
import { listUsageEventsAction } from '../server/server-actions';
import { Event } from './events-columns';
import { EventsTable } from './events-table';

type EventsResult = {
  events: Event[];
  total: number;
  pageSize: number;
  pageCount: number;
};

function parseMultiValue(value: string | null) {
  return value
    ? value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    : [];
}

export function EventsSection(props: {
  accountId: string;
  initialData: EventsResult;
  models: string[];
  features: string[];
  userIds: string[];
}) {
  const searchParams = useSearchParams();
  const page = Math.max(0, parseInt(searchParams.get('page') ?? '1', 10) - 1);
  const models = parseMultiValue(searchParams.get('model'));
  const features = parseMultiValue(searchParams.get('feature'));
  const userIds = parseMultiValue(searchParams.get('userId'));
  const since = searchParams.get('since') ?? undefined;
  const until = searchParams.get('until') ?? undefined;

  const queryKey = usageEventsQueryKey({
    accountId: props.accountId,
    page,
    models,
    features,
    userIds,
    since,
    until,
  });

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      listUsageEventsAction({
        accountId: props.accountId,
        page,
        models,
        features,
        userIds,
        since,
        until,
      }),
    initialData: props.initialData,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 10 * 60_000,
  });

  return (
    <EventsTable
      data={data.events}
      pageIndex={page}
      pageCount={data.pageCount}
      total={data.total}
      pageSize={data.pageSize}
      models={props.models}
      features={props.features}
      userIds={props.userIds}
    />
  );
}
