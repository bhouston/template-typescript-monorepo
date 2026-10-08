import { listUsersQuerySchema, listUsersResultSchema } from '@bhouston/sdk';
import { createRoute, type RouteHandler } from '@hono/zod-openapi';

export const route = createRoute({
  method: 'get',
  path: '/api/users',
  description: 'List users with optional search and pagination',
  tags: ['users'],
  operationId: 'list-users',
  summary: 'List users',
  request: { query: listUsersQuerySchema },
  responses: {
    200: { description: 'Users', content: { 'application/json': { schema: listUsersResultSchema } } },
  },
});

// TODO: Implement actual user listing logic
export const handler: RouteHandler<typeof route> = (c) => c.json({ rows: [], rowCount: 0 }, 200);
