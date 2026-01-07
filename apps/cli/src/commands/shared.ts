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
