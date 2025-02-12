import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify, { type FastifyInstance } from 'fastify';
import { fastifyFileRouter } from 'fastify-file-router';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const app = Fastify({
  logger: true,
  trustProxy: true,
}) as FastifyInstance;

await app.register(cors, {
  origin: '*',
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

await app.register(fastifyFileRouter, {
  routesDirs: ['./dist/routes'],
});

export default app;
