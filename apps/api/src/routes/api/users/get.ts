import { listUsersQuerySchema, listUsersResultSchema } from '@bhouston/sdk';
import { defineRouteZod } from 'fastify-file-router';

export const route = defineRouteZod({
  schema: {
    description: 'List users with optional search and pagination',
    tags: ['users'],
    operationId: 'list-users',
    summary: 'List users',
    querystring: listUsersQuerySchema,
    response: {
      200: listUsersResultSchema,
    },
  },
  handler: async (_request, reply) => {
    // TODO: Implement actual user listing logic
    // For now, return empty list
    return reply.status(200).send({
      rows: [],
      rowCount: 0,
    });
  },
});
