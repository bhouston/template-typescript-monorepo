import { fileURLToPath } from 'node:url';

import { OpenAPIHono } from '@hono/zod-openapi';
import { config as dotenvConfig } from 'dotenv';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

import { registerFileRoutes } from './lib/fileRouter.js';

dotenvConfig();

const app = new OpenAPIHono({
  // Return 400 JSON for schema validation failures (Hono's default is a bare 400).
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ error: 'Bad Request', issues: result.error.issues }, 400);
    }
    return undefined;
  },
});

if (process.env.NODE_ENV !== 'test') app.use(logger());

// Allow any origin. Not hono/cors: it writes c.res.headers before the handler runs, which forces
// @hono/node-server off its fast path and roughly halves throughput. c.header() avoids that.
app.use(async (c, next) => {
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Headers': c.req.header('Access-Control-Request-Headers') ?? '',
    });
  }
  c.header('Access-Control-Allow-Origin', '*');
  return next();
});

app.onError((err, c) => {
  if (err instanceof HTTPException) return c.json({ error: err.message }, err.status);
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

await registerFileRoutes(app, fileURLToPath(new URL('./routes', import.meta.url)));

app.doc31('/openapi.json', { openapi: '3.1.0', info: { title: 'API', version: '1.0.0' } });

export default app;
