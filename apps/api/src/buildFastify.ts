import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify, { type FastifyInstance } from 'fastify';
import { fastifyFileRouter } from 'fastify-file-router';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const isTest = process.env['NODE_ENV'] === 'test';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  routesDirs: [isTest ? join(__dirname, 'routes') : './dist/routes'],
});

export default app;
