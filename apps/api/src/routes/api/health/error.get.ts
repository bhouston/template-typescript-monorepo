import { defineRoute } from '../../../lib/fileRouter.js';

export const route = defineRoute({
  schema: {
    description: 'Throw Error',
    tags: ['utility'],
    operationId: 'health-error',
    summary: 'Throw Test Error',
    responses: {
      204: { description: 'Successful response' },
    },
  },

  handler: () => {
    throw new Error('Test Error');
  },
});
