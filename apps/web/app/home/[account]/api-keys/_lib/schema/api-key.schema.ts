import { z } from 'zod';

export const CreateApiKeySchema = z.object({
  accountId: z.string().uuid(),
  name: z.string().min(1).max(100).default('default'),
  keyHash: z.string().min(1),
  keyPrefix: z.string().min(1),
});

export const RevokeApiKeySchema = z.object({
  apiKeyId: z.string().uuid(),
  accountId: z.string().uuid(),
});

export const DeleteApiKeySchema = z.object({
  apiKeyId: z.string().uuid(),
  accountId: z.string().uuid(),
});
