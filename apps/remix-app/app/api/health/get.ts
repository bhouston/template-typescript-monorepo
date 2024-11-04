import type { FastifyReply, FastifyRequest } from 'fastify';

export default async function handler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.status(204).send();
}
