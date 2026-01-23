import type { ApiClient } from '../client.js';

const healthPath = () => '/api/health';

/**
 * Performs a health check on the API.
 *
 * @operationId health
 * @param client - The API client instance
 * @returns Promise resolving to void
 */
export const healthCheck = async (client: ApiClient): Promise<void> => {
  await client.axios.get(healthPath());
};
