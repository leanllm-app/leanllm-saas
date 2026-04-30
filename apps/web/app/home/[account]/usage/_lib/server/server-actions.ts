'use server';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { ListUsageEventsSchema } from '../schema/usage.schema';
import { createUsageService } from './usage.service';

export const listUsageEventsAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    const service = createUsageService(client);

    return service.getEvents({
      accountId: data.accountId,
      page: data.page,
      models: data.models,
      features: data.features,
      userIds: data.userIds,
      since: data.since,
      until: data.until,
    });
  },
  {
    schema: ListUsageEventsSchema,
  },
);
