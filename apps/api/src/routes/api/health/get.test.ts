import { errorToString } from '@bhouston/common-lib';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Health endpoint', () => {
  const app = Fastify({
    logger: false,
  });

  beforeAll(async () => {
    await app.register(cors, {
      origin: '*',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    app.get('/api/health', async (_, reply) => {
      reply.status(204).send();
    });

    await app.ready();
  });

  it('GET handler responds with 204 status', async () => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/api/health',
      });
      expect(response.statusCode).toBe(204);
    } catch (err) {
      throw new Error(`${errorToString(err)}`);
    }
  });
});
