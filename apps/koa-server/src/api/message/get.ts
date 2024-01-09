import { toCamelCase } from '@bhouston/common-lib';
import { stringToMd5Hash } from '@bhouston/node-lib';
import Koa from 'koa';

export const getMessage = async (ctx: Koa.Context) => {
  const text = toCamelCase('world');
  ctx.response.body = {
    message: text,
    random: stringToMd5Hash(text)
  };
  ctx.response.status = 200;
};
