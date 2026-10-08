import { OpenAPIHono } from '@hono/zod-openapi';
import { config as dotenvConfig } from 'dotenv';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

import * as healthError from './routes/api/health/error.get.js';
import * as health from './routes/api/health/get.js';
import * as hello from './routes/api/hello/get.js';
import * as getUser from './routes/api/users/$userName/get.js';
import * as listUsers from './routes/api/users/get.js';

dotenvConfig();

const app = new OpenAPIHono({
  // Return 400 JSON for schema validation failures (Fastify did this by default).
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ error: 'Bad Request', issues: result.error.issues }, 400);
    }
    return undefined;
  },
});

if (process.env.NODE_ENV !== 'test') app.use(logger());
app.use(cors());

app.onError((err, c) => {
  if (err instanceof HTTPException) return c.json({ error: err.message }, err.status);
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// ponytail: explicit registration replaces fastify-file-router; add a glob loader if the route count grows.
app
  .openapi(health.route, health.handler)
  .openapi(healthError.route, healthError.handler)
  .openapi(hello.route, hello.handler)
  .openapi(listUsers.route, listUsers.handler)
  .openapi(getUser.route, getUser.handler);

app.doc31('/openapi.json', { openapi: '3.1.0', info: { title: 'API', version: '1.0.0' } });

export default app;
