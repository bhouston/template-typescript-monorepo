import { errorToString } from '@bhouston/common-lib';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import { fastifyFileRouter } from 'fastify-file-router';
import { beforeAll, describe, expect, it } from 'vitest';

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

    // Vitest runs with cwd = monorepo root; use relative paths for fastify-file-router
    await app.register(fastifyFileRouter, {
      buildRoot: 'apps/api/src',
      routesDirs: ['routes'],
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
      throw new Error(`${errorToString(err)}`, { cause: err });
    }
  });
});
