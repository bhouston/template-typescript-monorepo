import { createRoute, type RouteHandler } from '@hono/zod-openapi';

export const route = createRoute({
  method: 'get',
  path: '/api/health/error',
  description: 'Throw Error',
  tags: ['utility'],
  operationId: 'health-error',
  summary: 'Throw Test Error',
  responses: {
    204: { description: 'Successful response' },
  },
});

export const handler: RouteHandler<typeof route> = () => {
  throw new Error('Test Error');
};
