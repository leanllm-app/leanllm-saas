'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import {
  CreateApiKeySchema,
  DeleteApiKeySchema,
  ListApiKeysSchema,
  RevokeApiKeySchema,
} from '../schema/api-key.schema';
import { createApiKeysService } from './api-keys.service';

export const listApiKeysAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    const service = createApiKeysService(client);

    return service.listByAccount(data.accountId);
  },
  {
    schema: ListApiKeysSchema,
  },
);

export const createApiKeyAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    const service = createApiKeysService(client);

    return service.create({
      accountId: data.accountId,
      name: data.name,
      keyHash: data.keyHash,
      keyPrefix: data.keyPrefix,
    });
  },
  {
    schema: CreateApiKeySchema,
  },
);

export const revokeApiKeyAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    const service = createApiKeysService(client);

    await service.revoke(data.apiKeyId, data.accountId);
  },
  {
    schema: RevokeApiKeySchema,
  },
);

export const deleteApiKeyAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    const service = createApiKeysService(client);

    await service.delete(data.apiKeyId, data.accountId);
  },
  {
    schema: DeleteApiKeySchema,
  },
);
