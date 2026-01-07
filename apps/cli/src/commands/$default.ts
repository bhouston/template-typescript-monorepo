import { defineCommand } from 'yargs-file-commands';

export const command = defineCommand({
  describe: 'Default command',
  builder: (yargs) => yargs,
  handler: async (_argv) => {
    console.log('Running default command');
  },
});
