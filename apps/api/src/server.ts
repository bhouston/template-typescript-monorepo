import 'source-map-support/register.js'; // required for cross platform source map support, other options didn't work across OSes.

import { serve } from '@hono/node-server';

import app from './app.js';

// Google Cloud Run sets K_SERVICE and PORT; it requires listening on all IPv4 addresses.
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
const port = Number(process.env.PORT ?? '3001');
const hostname = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;

serve({ fetch: app.fetch, port, hostname }, (info) => {
  console.log(`Server is running on port ${info.port}`);
});
