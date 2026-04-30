'use client';

import { useCallback, useState, useTransition } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Copy, Plus } from 'lucide-react';

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
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { toast } from '@kit/ui/sonner';

import { generateApiKey } from '~/lib/leanllm/crypto';

import { apiKeysQueryKey } from '../api-keys-query-keys';
import { createApiKeyAction } from '../server/server-actions';

function getUniqueKeyName(baseName: string, existingNames: string[]) {
  const normalizedExisting = new Set(
    existingNames.map((item) => item.trim().toLowerCase()).filter(Boolean),
  );
  const cleanBase = baseName.trim();

  if (!cleanBase) {
    return '';
  }

  const normalizedBase = cleanBase.toLowerCase();

  if (!normalizedExisting.has(normalizedBase)) {
    return cleanBase;
  }

  let suffix = 2;
  let candidate = `${cleanBase}-${suffix}`;

  while (normalizedExisting.has(candidate.toLowerCase())) {
    suffix += 1;
    candidate = `${cleanBase}-${suffix}`;
  }

  return candidate;
}

export function CreateKeyDialog(props: { accountId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleCreate = useCallback(() => {
    startTransition(async () => {
      const existingKeys =
        queryClient.getQueryData<Array<{ name: string }>>(
          apiKeysQueryKey(props.accountId),
        ) ?? [];
      const finalName = getUniqueKeyName(
        name,
        existingKeys.map((key) => key.name),
      );

      if (!finalName) {
        return;
      }

      const { rawKey, keyHash, keyPrefix } = await generateApiKey();

      await createApiKeyAction({
        accountId: props.accountId,
        name: finalName,
        keyHash,
        keyPrefix,
      });

      await queryClient.invalidateQueries({
        queryKey: apiKeysQueryKey(props.accountId),
      });

      setRawKey(rawKey);
      setName(finalName);
      toast.success('API key created');
    });
  }, [props.accountId, name, queryClient]);

  const handleCopy = useCallback(async () => {
    if (rawKey) {
      await navigator.clipboard.writeText(rawKey);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  }, [rawKey]);

  const handleClose = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setRawKey(null);
      setName('');
      setCopied(false);
    }
    setOpen(isOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          data-test={'create-api-key-trigger'}
          className="rounded-lg bg-[#507afe] px-4 font-semibold text-white shadow-sm transition hover:bg-[#4169f3] cursor-pointer"
        >
          <Plus className={'mr-2 w-4'} />
          <span>Create API Key</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {rawKey ? 'Your API Key' : 'Create API Key'}
          </DialogTitle>
          <DialogDescription>
            {rawKey
              ? 'Copy this key now. It will not be shown again.'
              : 'Create a new API key for your LeanLLM integration.'}
          </DialogDescription>
        </DialogHeader>

        {rawKey ? (
          <div className={'flex flex-col gap-3'}>
            <div
              className={
                'flex items-center justify-between rounded-lg border border-[#507afe]/25 bg-slate-50/80 p-3 dark:bg-white/5'
              }
            >
              <code className={'text-sm break-all'}>{rawKey}</code>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={handleCopy}
                className={'ml-2 shrink-0 cursor-pointer'}
              >
                <Copy className={'h-4 w-4'} />
              </Button>
            </div>
            {copied && (
              <p className={'text-muted-foreground text-xs'}>
                Copied to clipboard
              </p>
            )}
          </div>
        ) : (
          <div className={'flex flex-col gap-3'}>
            <div className={'flex flex-col gap-1.5'}>
              <Label htmlFor={'key-name'}>Name</Label>
              <Input
                id={'key-name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={'e.g. production, staging'}
                data-test={'api-key-name-input'}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {rawKey ? (
            <Button
              onClick={() => handleClose(false)}
              data-test={'close-key-dialog'}
              className="rounded-lg bg-[#507afe] font-semibold text-white hover:bg-[#4169f3] cursor-pointer"
            >
              Done
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={pending || !name.trim()}
              data-test={'create-api-key-submit'}
              className="rounded-lg bg-[#507afe] font-semibold text-white hover:bg-[#4169f3] cursor-pointer"
            >
              {pending ? 'Creating...' : 'Create Key'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
