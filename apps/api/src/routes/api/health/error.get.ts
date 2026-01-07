import { defineRouteZod } from 'fastify-file-router';
import { z } from 'zod';

export const route = defineRouteZod({
  schema: {
    description: 'Throw Error',
    tags: ['utility'],
    operationId: 'health-error',
    summary: 'Throw Test Error',
    response: {
      204: z.null().describe('Successful response'),
    },
  },
  handler: async (_request, _reply) => {
    throw new Error('Test Error');
  },
});
