import type { ApiClient } from '../client.js';
import { parseResult } from '../client.js';
import { buildPath } from '../lib/buildPath.js';
import type { SortingFromFields } from '../lib/list.js';
import {
  type GetUserParams,
  type GetUserResult,
  type ListUserQuery,
  type ListUserResult,
  listUsersResultSchema,
  listUsersSortFields,
  userSchema,
} from '../lib/schemas/users.js';

/** @internal */
export const listUserSortFields = listUsersSortFields;

/** @internal */
export const listUserDefaultSort: SortingFromFields<typeof listUserSortFields> = {
  sortBy: 'createdAt',
  sortDir: 'desc',
};

export type ListUserSortField = (typeof listUserSortFields)[number];

export type ListUserProps = {
  query: ListUserQuery;
};

/**
 * Lists users with optional search and pagination.
 *
 * @operationId list-users
 * @param client - The API client instance
 * @param props - The request properties
 * @param props.query - Query parameters for filtering, pagination, and sorting
 * @returns Promise resolving to a paginated list of users
 * @example
 * ```typescript
 * const users = await listUsers(client, {
 *   query: { searchText: 'john', pageOffset: 0, pageSize: 20 }
 * });
 * ```
 */
export const listUsers = async (client: ApiClient, props: ListUserProps): Promise<ListUserResult> => {
  const path = '/api/users';
  const response = await client.axios.get(path, {
    params: props.query,
  });
  return parseResult(client, listUsersResultSchema, response.data);
};

export type GetUserProps = {
  params: GetUserParams;
};

/**
 * Gets user information by username.
 *
 * @operationId get-user
 * @param client - The API client instance
 * @param props - The request properties
 * @param props.params - Path parameters (userName)
 * @returns Promise resolving to the user information
 * @example
 * ```typescript
 * const user = await getUser(client, {
 *   params: { userName: 'john-doe' }
 * });
 * ```
 */
export const getUser = async (client: ApiClient, props: GetUserProps): Promise<GetUserResult> => {
  const path = buildPath('/api/users/$userName', props.params);
  const response = await client.axios.get(path);
  return parseResult(client, userSchema, response.data);
};
