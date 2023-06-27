import { toCamelCase } from '@esbuild-ts-monorepo/common-lib';
import { stringToMd5Hash } from '@esbuild-ts-monorepo/node-lib';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import mount from 'koa-mount';
import proxy from 'koa-proxies';
import serve from 'koa-static';
import staticCache from 'koa-static-cache';

import { HOST, PORT, VERSION } from './config.js';

const useStaticCache = true;

export const main = async () => {
  console.log(`Version: ${VERSION}`);
  console.log('Specifying Server...');
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
    ctx.response.body = {
      message: 'Hello World!',
      random: stringToMd5Hash('Hello World!')
    };
    ctx.response.status = 200;
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  if (process.env.NODE_ENV === 'production') {
    if (useStaticCache) {
      app.use(mount('/', staticCache('../react-app/public', { maxAge: 60 })));
    } else {
      app.use(mount('/', serve('../react-app/public')));
    }
  } else {
    app.use(
      proxy('/', {
        target: 'http://127.0.0.1:8001/',
        changeOrigin: true
      })
    );
  }

  console.log('Starting server...');
  const server = app.listen(PORT, () => {
    console.log(`Server running ${HOST}:${PORT}`);
    console.log('Status: ' + toCamelCase('hello world!'));
  });

  let isClosed = false;
  const closeGracefully = async (signal: NodeJS.Signals) => {
    console.warn(`Received signal: ${signal}.`);
    if (isClosed) return;
    isClosed = true;
    console.log('Closing server...');
    server.close();
    console.log('Exiting...');
    process.exit(0);
  };

  // handle Ctrl-C, nodemon restart, and Docker stop
  ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2', 'exit'].forEach((signal) => {
    process.on(signal, closeGracefully);
  });
};

main();
