import type { FastifyReply, FastifyRequest } from 'fastify';

const ReplySchema = {
  204: {
    description: 'Successful response',
    type: 'null',
  },
} as const;

export const schema = {
  description: 'Throw Error',
  tags: ['utility'],
  operationId: 'health',
  summary: 'Throw Test Error',
  response: ReplySchema,
};

export default function handler(
  _request: FastifyRequest,
  _reply: FastifyReply,
) {
  throw new Error('Test Error');
}
