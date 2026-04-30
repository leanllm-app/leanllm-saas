import { useCallback } from 'react';

import { useSupabase } from './use-supabase';

export function useSignOut() {
  const client = useSupabase();

  const mutateAsync = useCallback(() => {
    return client.auth.signOut();
  }, [client]);

  return {
    mutateAsync,
  };
}
