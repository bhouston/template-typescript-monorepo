import 'source-map-support/register.js'; // required for cross platform source map support, other options didn't work across OSes.

import app from './buildFastify.js';

// https://fastify.dev/docs/latest/Guides/Serverless/#google-cloud-run
// Google Cloud Run will set this environment variable for you, so
// you can also use it to detect if you are running in Cloud Run
const IS_GOOGLE_CLOUD_RUN = process.env['K_SERVICE'] !== undefined;
// You must listen on the port Cloud Run provides
const port = Number(process.env['PORT'] ?? '3001');
// You must listen on all IPV4 addresses in Cloud Run
const host = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;

// Run the server!
try {
  const address = await app.listen({ port, host: host ?? undefined });
  console.log(`Server is running on port ${address}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
