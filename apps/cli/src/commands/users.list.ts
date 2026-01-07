import { defineCommand } from 'yargs-file-commands';
import { withPagination } from './shared.js';

export const command = defineCommand({
  command: 'list',
  builder: (yargs) => withPagination(yargs),
  handler: async (argv) => {
    // argv.page and argv.limit are correctly typed as number
    console.log(`Page: ${argv.page}, Limit: ${argv.limit}`);
  },
});
