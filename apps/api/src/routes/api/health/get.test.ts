import { errorToString } from '@bhouston/common-lib';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { fastifyFileRouter } from 'fastify-file-router';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

    await app.register(fastifyFileRouter, {
      routesDirs: [join(__dirname, '../..')],
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
