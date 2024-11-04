import { remixFastify } from '@mcansh/remix-fastify';
import { fastify } from 'fastify';
import { fastifyFileRouter } from 'fastify-file-router';

const app = fastify();

await app.register(fastifyFileRouter, {
  mount: '/api',
  routesDirs: ['./app/api']
});

await app.register(remixFastify, {
  defaultCacheControl: { public: true, maxAge: '10 minutes' }, // for things in the public folder.
  assetCacheControl: { public: true, maxAge: '1 year', immutable: true } // for hashed files in assets folder.
});

export default app;
