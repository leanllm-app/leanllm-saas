'use client';

import { useCallback, useTransition } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import { DataTable } from '@kit/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { toast } from '@kit/ui/sonner';

import {
  deleteApiKeyAction,
  revokeApiKeyAction,
} from '../server/server-actions';

type ApiKey = {
  api_key_id: string;
  account_id: string;
  key_prefix: string;
  name: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
};

function RevokeButton(props: { apiKeyId: string; accountId: string }) {
  const [pending, startTransition] = useTransition();

  const handleRevoke = useCallback(() => {
    startTransition(async () => {
      await revokeApiKeyAction({
        apiKeyId: props.apiKeyId,
        accountId: props.accountId,
      });
      toast.success('API key revoked');
    });
  }, [props.apiKeyId, props.accountId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'destructive'}
          data-test={'revoke-api-key'}
        >
          Revoke
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke API Key</DialogTitle>
          <DialogDescription>
            This will immediately invalidate this API key. Any applications
            using this key will stop working.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            onClick={handleRevoke}
            disabled={pending}
          >
            {pending ? 'Revoking...' : 'Confirm Revoke'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteButton(props: { apiKeyId: string; accountId: string }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      await deleteApiKeyAction({
        apiKeyId: props.apiKeyId,
        accountId: props.accountId,
      });
      toast.success('API key deleted');
    });
  }, [props.apiKeyId, props.accountId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'outline'} data-test={'delete-api-key'}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete API Key</DialogTitle>
          <DialogDescription>
            This will permanently delete this API key. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getColumns(): ColumnDef<ApiKey>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'key_prefix',
      header: 'Key',
      cell: ({ row }) => (
        <code className={'text-muted-foreground text-xs'}>
          {row.original.key_prefix}
        </code>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      accessorKey: 'last_used_at',
      header: 'Last Used',
      cell: ({ row }) =>
        row.original.last_used_at
          ? new Date(row.original.last_used_at).toLocaleDateString()
          : 'Never',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ row }) =>
        row.original.is_active ? (
          <Badge variant={'default'}>Active</Badge>
        ) : (
          <Badge variant={'secondary'}>Revoked</Badge>
        ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const key = row.original;

        return (
          <div className={'flex justify-end gap-2'}>
            {key.is_active ? (
              <RevokeButton
                apiKeyId={key.api_key_id}
                accountId={key.account_id}
              />
            ) : (
              <DeleteButton
                apiKeyId={key.api_key_id}
                accountId={key.account_id}
              />
            )}
          </div>
        );
      },
    },
  ];
}

export function ApiKeysTable(props: { data: ApiKey[] }) {
  const columns = getColumns();

  return <DataTable columns={columns} data={props.data} />;
}
