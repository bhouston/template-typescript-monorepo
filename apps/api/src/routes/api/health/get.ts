import { defineRouteZod } from 'fastify-file-router';
import { z } from 'zod';

export const route = defineRouteZod({
  schema: {
    description: 'Health Check',
    tags: ['utility'],
    operationId: 'health',
    summary: 'Health Check',
    response: {
      204: z.null().describe('Successful response'),
    },
  },
  handler: async (_request, reply) => {
    await reply.status(204).send();
  },
});
