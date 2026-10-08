import { helloQuerySchema, helloResultSchema } from '@bhouston/sdk';
import { createRoute, type RouteHandler } from '@hono/zod-openapi';

export const route = createRoute({
  method: 'get',
  path: '/api/hello',
  description: 'Hello endpoint with optional name parameter',
  tags: ['utility'],
  operationId: 'hello',
  summary: 'Hello',
  request: { query: helloQuerySchema },
  responses: {
    200: { description: 'Greeting', content: { 'application/json': { schema: helloResultSchema } } },
  },
});

export const handler: RouteHandler<typeof route> = (c) => {
  const { name = 'World' } = c.req.valid('query');
  return c.json({ message: `Hello, ${name}!` }, 200);
};
