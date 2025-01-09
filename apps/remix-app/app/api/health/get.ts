import type { FastifyReply, FastifyRequest } from 'fastify';

export default async function handler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await reply.status(204).send();
}
