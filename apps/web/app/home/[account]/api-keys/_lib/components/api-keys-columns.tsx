'use client';

import { useCallback, useState, useTransition } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { Copy, Eye, EyeOff } from 'lucide-react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
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
import { cn } from '@kit/ui/utils';

import { apiKeysQueryKey } from '../api-keys-query-keys';
import {
  deleteApiKeyAction,
  revokeApiKeyAction,
} from '../server/server-actions';

export type ApiKeyRecord = {
  api_key_id: string;
  account_id: string;
  key_prefix: string;
  name: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
};

/** Legacy rows stored prefix as `first12 + '...'`. Strip suffix for display/copy only. */
function normalizedKeyPrefix(stored: string): string {
  return stored.endsWith('...') ? stored.slice(0, -3) : stored;
}

function maskKeyPrefixPreview(full: string): string {
  if (full.length <= 10) {
    return '•'.repeat(full.length);
  }
  const head = full.slice(0, Math.min(14, Math.ceil(full.length * 0.42)));
  return `${head}${'·'.repeat(14)}`;
}

function KeyPrefixCell(props: { keyPrefix: string }) {
  const [revealed, setRevealed] = useState(false);

  const fullPrefix = normalizedKeyPrefix(props.keyPrefix);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullPrefix);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Could not copy');
    }
  }, [fullPrefix]);

  const displayText = revealed ? fullPrefix : maskKeyPrefixPreview(fullPrefix);

  return (
    <div className="flex min-w-0 max-w-[min(100%,28rem)] items-stretch gap-2 sm:max-w-96">
      <div
        className={cn(
          'border-border bg-muted/40 text-muted-foreground box-border flex min-h-8 min-w-0 flex-1 items-center rounded-lg border px-3 font-mono text-xs leading-none dark:bg-white/5',
          revealed ? 'text-foreground' : 'overflow-hidden',
          revealed && 'overflow-x-auto',
        )}
        title={revealed ? fullPrefix : undefined}
      >
        <span
          className={cn(
            'min-w-0 leading-none',
            revealed ? 'whitespace-nowrap' : 'truncate',
          )}
        >
          {displayText}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="box-border size-8 min-h-8 shrink-0 rounded-lg p-0 cursor-pointer"
        aria-label={revealed ? 'Hide key' : 'Show key'}
        aria-pressed={revealed}
        data-test="toggle-key-visibility"
        onClick={() => setRevealed((v) => !v)}
      >
        {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="box-border size-8 min-h-8 shrink-0 rounded-lg p-0 cursor-pointer"
        aria-label="Copy full key prefix"
        data-test="copy-key-prefix"
        onClick={handleCopy}
      >
        <Copy className="size-4" />
      </Button>
    </div>
  );
}

function RevokeButton(props: { apiKeyId: string; accountId: string }) {
  const [pending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleRevoke = useCallback(() => {
    startTransition(async () => {
      await revokeApiKeyAction({
        apiKeyId: props.apiKeyId,
        accountId: props.accountId,
      });
      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey(props.accountId),
      });
      toast.success('API key revoked');
    });
  }, [props.apiKeyId, props.accountId, queryClient]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'destructive'}
          className="rounded-lg border border-red-500/25 bg-red-500/8 font-medium text-red-700 shadow-none hover:bg-red-500/15 dark:text-red-400"
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
            className="cursor-pointer h-8"
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
  const queryClient = useQueryClient();

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      await deleteApiKeyAction({
        apiKeyId: props.apiKeyId,
        accountId: props.accountId,
      });
      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey(props.accountId),
      });
      toast.success('API key deleted');
    });
  }, [props.apiKeyId, props.accountId, queryClient]);

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

export function getApiKeysColumns(): ColumnDef<ApiKeyRecord>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'key_prefix',
      header: 'Key',
      cell: ({ row }) => <KeyPrefixCell keyPrefix={row.original.key_prefix} />,
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
          <Badge
            className={cn(
              'border border-[#507afe]/35 bg-[#507afe]/10 font-medium text-[#3d5fd4] shadow-none dark:text-[#7ab0ff]',
            )}
            variant={'outline'}
          >
            Active
          </Badge>
        ) : (
          <Badge
            className="border-slate-300/80 bg-slate-100/80 font-medium text-slate-600 shadow-none"
            variant={'secondary'}
          >
            Revoked
          </Badge>
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
