import { getUser } from '@bhouston/sdk';
import { defineCommand } from 'yargs-file-commands';
import { createClient, createClientWithHost } from '../../lib/client.js';

export const command = defineCommand({
  command: 'get',
  describe: 'Get user by username',
  builder: (yargs) =>
    yargs
      .options({
        host: {
          type: 'string',
          alias: 'h',
          description: 'API host URL (overrides default)',
        },
      })
      .positional('userName', {
        type: 'string',
        demandOption: true,
        describe: 'Username to lookup',
      }),
  handler: async (argv) => {
    try {
      const client = argv.host ? createClientWithHost(argv.host) : createClient();
      const user = await getUser(client, {
        params: { userName: argv.userName },
      });

      console.log(`User: ${user.name} (ID: ${user.id})`);
    } catch (error) {
      console.error(`✗ Get user failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  },
});
