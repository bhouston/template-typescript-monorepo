import { helloQuerySchema, helloResultSchema } from '@bhouston/sdk';
import { defineRouteZod } from 'fastify-file-router';

export const route = defineRouteZod({
  schema: {
    description: 'Hello endpoint with optional name parameter',
    tags: ['utility'],
    operationId: 'hello',
    summary: 'Hello',
    querystring: helloQuerySchema,
    response: {
      200: helloResultSchema,
    },
  },
  handler: async (request, reply) => {
    const query = request.query as { name?: string } | undefined;
    const name = query?.name || 'World';
    return reply.status(200).send({
      message: `Hello, ${name}!`,
    });
  },
});
