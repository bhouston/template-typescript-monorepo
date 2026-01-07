import { defineCommand } from 'yargs-file-commands';

export const command = defineCommand({
  command: 'create <name>', // Define positional args in the command string
  describe: 'Create a new resource',
  builder: (yargs) =>
    yargs.positional('name', {
      describe: 'Name of the resource',
      type: 'string',
      demandOption: true,
    }),
  handler: async (argv) => {
    // argv.name is correctly typed as string
    console.log(`Creating resource: ${argv.name}`);
  },
});
