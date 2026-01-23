import { getUserParamsSchema, userSchema } from '@bhouston/sdk';
import { defineRouteZod } from 'fastify-file-router';
import { NotFoundException } from 'fastify-http-exceptions/core';

export const route = defineRouteZod({
  schema: {
    description: 'Get user details by username',
    tags: ['users'],
    operationId: 'get-user',
    summary: 'Get user',
    params: getUserParamsSchema,
    response: {
      200: userSchema,
      404: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const params = request.params as { userName: string };
    const { userName } = params;

    // TODO: Implement actual user lookup logic
    // For now, return a mock user or 404
    if (userName === 'test-user') {
      return reply.status(200).send({
        id: 1,
        name: 'test-user',
      });
    }

    throw new NotFoundException('User not found');
  },
});
