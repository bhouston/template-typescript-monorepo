import * as z from 'zod';
import { createSortingOptionalSchema, listResultSchema, paginationOptionalSchema } from '../list.js';
import { userNameParamsSchema } from '../schemas.js';

/**
 * Zod schema for User return type.
 */
export const userSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const listUsersSortFields = ['id', 'name', 'createdAt'] as const;

export const listUsersQuerySchema = paginationOptionalSchema
  .merge(createSortingOptionalSchema(listUsersSortFields))
  .merge(
    z.strictObject({
      searchText: z.string().max(256).optional(),
    }),
  );

export type ListUserQuery = z.infer<typeof listUsersQuerySchema>;

export const listUsersResultSchema = listResultSchema(userSchema);

export type ListUserResult = z.infer<typeof listUsersResultSchema>;

export const getUserParamsSchema = userNameParamsSchema;

export type GetUserParams = z.infer<typeof getUserParamsSchema>;

export type GetUserResult = z.infer<typeof userSchema>;
