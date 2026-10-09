import { getUserParamsSchema, userSchema } from '@bhouston/sdk';
import { z } from '@hono/zod-openapi';
import { defineRoute } from '../../../../lib/fileRouter.js';

export const route = defineRoute({
  schema: {
    description: 'Get user details by username',
    tags: ['users'],
    operationId: 'get-user',
    summary: 'Get user',
    request: { params: getUserParamsSchema },
    responses: {
      200: { description: 'User', content: { 'application/json': { schema: userSchema } } },
      404: { description: 'Not found', content: { 'application/json': { schema: z.object({ error: z.string() }) } } },
    },
  },

  // TODO: Implement actual user lookup logic
  handler: (c) => {
    const { userName } = c.req.valid('param');
    if (userName === 'test-user') return c.json({ id: 1, name: 'test-user' }, 200);
    return c.json({ error: 'User not found' }, 404);
  },
});
