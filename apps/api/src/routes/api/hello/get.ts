import { helloQuerySchema, helloResultSchema } from '@bhouston/sdk';
import { defineRoute } from '../../../lib/fileRouter.js';

export const route = defineRoute({
  schema: {
    description: 'Hello endpoint with optional name parameter',
    tags: ['utility'],
    operationId: 'hello',
    summary: 'Hello',
    request: { query: helloQuerySchema },
    responses: {
      200: { description: 'Greeting', content: { 'application/json': { schema: helloResultSchema } } },
    },
  },

  handler: (c) => {
    const { name = 'World' } = c.req.valid('query');
    return c.json({ message: `Hello, ${name}!` }, 200);
  },
});
