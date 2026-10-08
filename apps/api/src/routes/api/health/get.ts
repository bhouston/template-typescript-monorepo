import { createRoute, type RouteHandler } from '@hono/zod-openapi';

export const route = createRoute({
  method: 'get',
  path: '/api/health',
  description: 'Health Check',
  tags: ['utility'],
  operationId: 'health',
  summary: 'Health Check',
  responses: {
    204: { description: 'Successful health check response' },
  },
});

export const handler: RouteHandler<typeof route> = (c) => c.body(null, 204);
