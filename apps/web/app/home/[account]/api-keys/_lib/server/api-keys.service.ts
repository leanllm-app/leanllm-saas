import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '~/lib/database.types';

export function createApiKeysService(client: SupabaseClient<Database>) {
  return new ApiKeysService(client);
}

class ApiKeysService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async listByAccount(accountId: string) {
    const { data, error } = await this.client
      .from('api_keys')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async create(params: {
    accountId: string;
    name: string;
    keyHash: string;
    keyPrefix: string;
  }) {
    const { data, error } = await this.client
      .from('api_keys')
      .insert({
        account_id: params.accountId,
        name: params.name,
        key_hash: params.keyHash,
        key_prefix: params.keyPrefix,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async revoke(apiKeyId: string, accountId: string) {
    const { error } = await this.client
      .from('api_keys')
      .update({ is_active: false })
      .eq('api_key_id', apiKeyId)
      .eq('account_id', accountId);

    if (error) {
      throw error;
    }
  }

  async delete(apiKeyId: string, accountId: string) {
    const { error } = await this.client
      .from('api_keys')
      .delete()
      .eq('api_key_id', apiKeyId)
      .eq('account_id', accountId)
      .eq('is_active', false);

    if (error) {
      throw error;
    }
  }
}
