import { listUsersQuerySchema, listUsersResultSchema } from '@bhouston/sdk';
import { defineRoute } from '../../../lib/fileRouter.js';

export const route = defineRoute({
  schema: {
    description: 'List users with optional search and pagination',
    tags: ['users'],
    operationId: 'list-users',
    summary: 'List users',
    request: { query: listUsersQuerySchema },
    responses: {
      200: { description: 'Users', content: { 'application/json': { schema: listUsersResultSchema } } },
    },
  },

  // TODO: Implement actual user listing logic
  handler: (c) => c.json({ rows: [], rowCount: 0 }, 200),
});
