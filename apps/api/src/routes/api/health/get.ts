import type { FastifyReply, FastifyRequest } from 'fastify';

const ReplySchema = {
  204: {
    description: 'Successful response',
    type: 'null',
  },
} as const;

export const schema = {
  description: 'Health Check',
  tags: ['utility'],
  operationId: 'health',
  summary: 'Health Check',
  response: ReplySchema,
};

export default async function handler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  await reply.status(204).send();
}
