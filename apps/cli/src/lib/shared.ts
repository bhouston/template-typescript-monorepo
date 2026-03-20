import type { Argv } from 'yargs';

export const withPagination = <T>(yargs: Argv<T>) =>
  yargs
    .option('page', {
      type: 'number',
      default: 1,
      describe: 'Page number',
    })
    .option('limit', {
      type: 'number',
      default: 10,
      describe: 'Items per page',
    });

export const withPaginationSDK = <T>(yargs: Argv<T>) =>
  yargs
    .option('page-offset', {
      type: 'number',
      default: 0,
      describe: 'Number of items to skip',
    })
    .option('page-size', {
      type: 'number',
      default: 50,
      describe: 'Number of items to return',
    });
