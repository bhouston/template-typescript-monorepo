import { defineRoute } from '../../../lib/fileRouter.js';

export const route = defineRoute({
  schema: {
    description: 'Health Check',
    tags: ['utility'],
    operationId: 'health',
    summary: 'Health Check',
    responses: {
      204: { description: 'Successful health check response' },
    },
  },

  handler: (c) => c.body(null, 204),
});
