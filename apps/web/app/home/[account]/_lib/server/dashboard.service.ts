import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '~/lib/database.types';

export function createDashboardService(client: SupabaseClient<Database>) {
  return new DashboardService(client);
}

class DashboardService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getSummary(accountId: string, since: string, until: string) {
    const { data, error } = await this.client
      .from('events')
      .select('cost_usd, total_tokens, latency_ms')
      .eq('account_id', accountId)
      .gte('timestamp', since)
      .lte('timestamp', until);

    if (error) {
      throw error;
    }

    const events = data ?? [];
    const totalCost = events.reduce((sum, e) => sum + (e.cost_usd ?? 0), 0);
    const totalTokens = events.reduce(
      (sum, e) => sum + (e.total_tokens ?? 0),
      0,
    );
    const totalCalls = events.length;
    const avgLatency =
      totalCalls > 0
        ? Math.round(
            events.reduce((sum, e) => sum + (e.latency_ms ?? 0), 0) /
              totalCalls,
          )
        : 0;

    return { totalCost, totalTokens, totalCalls, avgLatency };
  }

  async getCostOverTime(accountId: string, since: string, until: string) {
    const { data, error } = await this.client
      .from('events')
      .select('timestamp, cost_usd')
      .eq('account_id', accountId)
      .gte('timestamp', since)
      .lte('timestamp', until)
      .order('timestamp', { ascending: true });

    if (error) {
      throw error;
    }

    const dailyMap = new Map<string, number>();

    for (const event of data ?? []) {
      const day = event.timestamp.slice(0, 10);
      dailyMap.set(day, (dailyMap.get(day) ?? 0) + (event.cost_usd ?? 0));
    }

    return Array.from(dailyMap.entries()).map(([date, cost]) => ({
      date,
      cost: Math.round(cost * 10000) / 10000,
    }));
  }

  async getCostByFeature(accountId: string, since: string, until: string) {
    const { data, error } = await this.client
      .from('events')
      .select('feature, cost_usd')
      .eq('account_id', accountId)
      .gte('timestamp', since)
      .lte('timestamp', until)
      .not('feature', 'is', null);

    if (error) {
      throw error;
    }

    const featureMap = new Map<string, number>();

    for (const event of data ?? []) {
      const feature = event.feature ?? 'unknown';
      featureMap.set(
        feature,
        (featureMap.get(feature) ?? 0) + (event.cost_usd ?? 0),
      );
    }

    return Array.from(featureMap.entries())
      .map(([feature, cost]) => ({
        feature,
        cost: Math.round(cost * 10000) / 10000,
      }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 10);
  }

  async getCostByModel(accountId: string, since: string, until: string) {
    const { data, error } = await this.client
      .from('events')
      .select('model, cost_usd')
      .eq('account_id', accountId)
      .gte('timestamp', since)
      .lte('timestamp', until);

    if (error) {
      throw error;
    }

    const modelMap = new Map<string, number>();

    for (const event of data ?? []) {
      modelMap.set(
        event.model,
        (modelMap.get(event.model) ?? 0) + (event.cost_usd ?? 0),
      );
    }

    return Array.from(modelMap.entries())
      .map(([model, cost]) => ({
        model,
        cost: Math.round(cost * 10000) / 10000,
      }))
      .sort((a, b) => b.cost - a.cost);
  }
}
