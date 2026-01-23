import { healthCheckResultSchema } from '@bhouston/sdk';
import { defineRouteZod } from 'fastify-file-router';

export const route = defineRouteZod({
  schema: {
    description: 'Health Check',
    tags: ['utility'],
    operationId: 'health',
    summary: 'Health Check',
    response: {
      204: healthCheckResultSchema,
    },
  },
  handler: async (_request, reply) => {
    await reply.status(204).send();
  },
});
