import type { ApiClient } from '../client.js';
import { parseResult } from '../client.js';
import { type HelloQuery, type HelloResult, helloResultSchema } from '../lib/schemas/hello.js';

export type HelloProps = {
  query?: HelloQuery;
};

/**
 * Calls the hello endpoint with an optional name parameter.
 *
 * @operationId hello
 * @param client - The API client instance
 * @param props - The request properties
 * @param props.query - Optional query parameters (name)
 * @returns Promise resolving to the hello message
 * @example
 * ```typescript
 * const result = await hello(client, {
 *   query: { name: 'World' }
 * });
 * ```
 */
export const hello = async (client: ApiClient, props: HelloProps = {}): Promise<HelloResult> => {
  const path = '/api/hello';
  const response = await client.axios.get(path, {
    params: props.query,
  });
  return parseResult(client, helloResultSchema, response.data);
};
