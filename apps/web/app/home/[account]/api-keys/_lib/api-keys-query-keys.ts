export function apiKeysQueryKey(accountId: string) {
  return ['api-keys', accountId] as const;
}
