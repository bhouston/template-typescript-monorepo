import { toCamelCase } from '@esbuild-ts-monorepo/common-lib';
import { stringToMd5Hash } from '@esbuild-ts-monorepo/node-lib';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import mount from 'koa-mount';
import serve from 'koa-static';
import staticCache from 'koa-static-cache';

import { NAME, PORT, VERSION } from './config.js';

const useStaticCache = true;

export const main = async () => {
  console.log(`${NAME}: ${VERSION}`);
  const app = new Koa();
  const router = new Router();

  app.use(logger());
  app.use(cors());
  app.use(
    compress({
      filter() {
        return true;
      }
    })
  );

  router.get('/api/my-api-composite', async (ctx: Koa.Context) => {
    const text = toCamelCase('Hello World!');
    ctx.response.body = {
      message: text,
      random: stringToMd5Hash(text)
    };
    ctx.response.status = 200;
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  if (process.env.NODE_ENV === 'production') {
    if (useStaticCache) {
      app.use(mount('/', staticCache('../react-app/dist', { maxAge: 60 })));
    } else {
      app.use(mount('/', serve('../react-app/dist')));
    }
  }

  const server = app.listen(PORT, () => {
    console.log(`   Server: http://localhost:${PORT}`);
  });

  let isClosed = false;
  const closeGracefully = async (signal: NodeJS.Signals) => {
    if (isClosed) return;
    console.warn(`Closing as a result of signal: ${signal}.`);
    isClosed = true;
    server.close();
    process.exit(0);
  };

  // handle Ctrl-C, nodemon restart, and Docker stop
  ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2', 'exit'].forEach((signal) => {
    process.on(signal, closeGracefully);
  });
};

main();
