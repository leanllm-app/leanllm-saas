/**
 * Generate a LeanLLM API key and its SHA-256 hash.
 * The raw key is shown once to the user; only the hash is stored.
 */
export async function generateApiKey() {
  const rawKey = 'lllm_' + crypto.randomUUID().replace(/-/g, '').slice(0, 32);
  /**
   * Identification prefix persisted in DB (full raw key is never stored).
   * rawKey length is 37 (`lllm_` + 32 hex). We keep the first 32 chars so the
   * dashboard matches what the user saw at creation except the last 5 chars.
   */
  const keyPrefix = rawKey.slice(0, 32);
  const keyHash = await hashApiKey(rawKey);

  return { rawKey, keyPrefix, keyHash };
}

export async function hashApiKey(rawKey: string): Promise<string> {
  const encoded = new TextEncoder().encode(rawKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
