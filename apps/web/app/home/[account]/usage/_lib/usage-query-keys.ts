type UsageEventsQueryParams = {
  accountId: string;
  page: number;
  models: string[];
  features: string[];
  userIds: string[];
  since?: string;
  until?: string;
};

export function usageEventsQueryKey(params: UsageEventsQueryParams) {
  return [
    'usage-events',
    params.accountId,
    params.page,
    [...params.models].sort().join(','),
    [...params.features].sort().join(','),
    [...params.userIds].sort().join(','),
    params.since ?? '',
    params.until ?? '',
  ] as const;
}
