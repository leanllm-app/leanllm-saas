'use client';

import { useQuery } from '@tanstack/react-query';

import { apiKeysQueryKey } from '../api-keys-query-keys';
import { listApiKeysAction } from '../server/server-actions';
import { ApiKeysTable } from './api-keys-table';
import { ApiKeyRecord } from './api-keys-columns';

export function ApiKeysSection(props: {
  accountId: string;
  initialData: ApiKeyRecord[];
}) {
  const { data = props.initialData, isError } = useQuery({
    queryKey: apiKeysQueryKey(props.accountId),
    queryFn: () => listApiKeysAction({ accountId: props.accountId }),
    initialData: props.initialData,
  });

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Could not load API keys. Refresh the page to try again.
      </p>
    );
  }

  return <ApiKeysTable accountId={props.accountId} data={data} />;
}
