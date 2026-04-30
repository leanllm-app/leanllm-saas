import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '~/lib/database.types';

const PAGE_SIZE = 25;

export function createUsageService(client: SupabaseClient<Database>) {
  return new UsageService(client);
}

class UsageService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getEvents(params: {
    accountId: string;
    page: number;
    models?: string[];
    features?: string[];
    userIds?: string[];
    since?: string;
    until?: string;
  }) {
    let query = this.client
      .from('events')
      .select(
        'event_id, timestamp, model, provider, feature, user_id, input_tokens, output_tokens, total_tokens, cost_usd, latency_ms, labels, metadata, environment, prompt, response',
        { count: 'exact' },
      )
      .eq('account_id', params.accountId)
      .order('timestamp', { ascending: false })
      .range(params.page * PAGE_SIZE, (params.page + 1) * PAGE_SIZE - 1);

    if (params.models && params.models.length > 0) {
      query = query.in('model', params.models);
    }
    if (params.features && params.features.length > 0) {
      query = query.in('feature', params.features);
    }
    if (params.userIds && params.userIds.length > 0) {
      query = query.in('user_id', params.userIds);
    }
    if (params.since) {
      query = query.gte('timestamp', params.since);
    }
    if (params.until) {
      query = query.lte('timestamp', params.until);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      events: data ?? [],
      total: count ?? 0,
      pageSize: PAGE_SIZE,
      pageCount: Math.ceil((count ?? 0) / PAGE_SIZE),
    };
  }

  async getFilterOptions(accountId: string) {
    const [modelsResult, featuresResult, userIdsResult] = await Promise.all([
      this.client
        .from('events')
        .select('model')
        .eq('account_id', accountId)
        .limit(100),
      this.client
        .from('events')
        .select('feature')
        .eq('account_id', accountId)
        .not('feature', 'is', null)
        .limit(100),
      this.client
        .from('events')
        .select('user_id')
        .eq('account_id', accountId)
        .not('user_id', 'is', null)
        .limit(200),
    ]);

    const models = [...new Set((modelsResult.data ?? []).map((e) => e.model))];
    const features = [
      ...new Set(
        (featuresResult.data ?? [])
          .map((e) => e.feature)
          .filter(Boolean) as string[],
      ),
    ];
    const userIds = [
      ...new Set(
        (userIdsResult.data ?? [])
          .map((e) => e.user_id)
          .filter(Boolean) as string[],
      ),
    ];

    return { models, features, userIds };
  }

  async getEventsForExport(params: {
    accountId: string;
    model?: string;
    feature?: string;
    userId?: string;
    since?: string;
    until?: string;
  }) {
    let query = this.client
      .from('events')
      .select(
        'event_id, timestamp, model, provider, feature, user_id, input_tokens, output_tokens, total_tokens, cost_usd, latency_ms, environment',
      )
      .eq('account_id', params.accountId)
      .order('timestamp', { ascending: false })
      .limit(10000);

    if (params.model) {
      query = query.eq('model', params.model);
    }
    if (params.feature) {
      query = query.eq('feature', params.feature);
    }
    if (params.userId) {
      query = query.eq('user_id', params.userId);
    }
    if (params.since) {
      query = query.gte('timestamp', params.since);
    }
    if (params.until) {
      query = query.lte('timestamp', params.until);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data ?? [];
  }
}
