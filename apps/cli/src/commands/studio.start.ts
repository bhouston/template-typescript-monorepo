import { defineCommand } from 'yargs-file-commands';

export const command = defineCommand({
  command: 'start', // Optional: defaults to filename if omitted
  describe: 'Studio web interface',
  builder: (yargs) =>
    yargs.option('port', {
      alias: 'p',
      type: 'number',
      describe: 'Port to listen on',
      default: 3000,
    }),
  handler: async (argv) => {
    // argv.port is correctly typed as number
    console.log(`Starting studio on port ${argv.port}`);
  },
});
