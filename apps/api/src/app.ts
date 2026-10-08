import { fileURLToPath } from 'node:url';

import { OpenAPIHono } from '@hono/zod-openapi';
import { config as dotenvConfig } from 'dotenv';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

import { registerFileRoutes } from './lib/fileRouter.js';

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

await registerFileRoutes(app, fileURLToPath(new URL('./routes', import.meta.url)));

app.doc31('/openapi.json', { openapi: '3.1.0', info: { title: 'API', version: '1.0.0' } });

export default app;
