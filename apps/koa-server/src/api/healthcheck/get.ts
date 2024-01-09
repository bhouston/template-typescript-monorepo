import Koa from 'koa';

export const getHealthCheck = async (ctx: Koa.Context) => {
  ctx.body = 'OK';
};
