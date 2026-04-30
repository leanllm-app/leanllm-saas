import { z } from 'zod';

export const ListUsageEventsSchema = z.object({
  accountId: z.string().uuid(),
  page: z.number().int().min(0).default(0),
  models: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  userIds: z.array(z.string()).optional(),
  since: z.string().optional(),
  until: z.string().optional(),
});
