'use client';

import { useCallback, useState, useTransition } from 'react';

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

import { createApiKeyAction } from '../server/server-actions';

export function CreateKeyDialog(props: { accountId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('default');
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleCreate = useCallback(() => {
    startTransition(async () => {
      const { rawKey, keyHash, keyPrefix } = await generateApiKey();

      await createApiKeyAction({
        accountId: props.accountId,
        name,
        keyHash,
        keyPrefix,
      });

      setRawKey(rawKey);
      toast.success('API key created');
    });
  }, [props.accountId, name]);

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
      setName('default');
      setCopied(false);
    }
    setOpen(isOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button size={'sm'} data-test={'create-api-key-trigger'}>
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
                'bg-muted flex items-center justify-between rounded-md border p-3'
              }
            >
              <code className={'text-sm break-all'}>{rawKey}</code>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={handleCopy}
                className={'ml-2 shrink-0'}
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
            >
              Done
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={pending || !name.trim()}
              data-test={'create-api-key-submit'}
            >
              {pending ? 'Creating...' : 'Create Key'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
