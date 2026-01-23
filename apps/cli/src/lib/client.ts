import type { ApiClient } from '@bhouston/sdk';
import { createAnonymousClient } from '@bhouston/sdk';

/**
 * Create an API client with a specific host
 */
export function createClientWithHost(host: string): ApiClient {
  return createAnonymousClient({ host });
}

/**
 * Create an API client from environment variable or default
 */
export function createClient(): ApiClient {
  const host = process.env.API_HOST || 'http://localhost:3001';
  return createAnonymousClient({ host });
}
