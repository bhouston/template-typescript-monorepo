import { listUsers } from '@bhouston/sdk';
import { defineCommand } from 'yargs-file-commands';
import { createClient, createClientWithHost } from '../../lib/client.js';

export const command = defineCommand({
  command: 'list',
  describe: 'List users',
  builder: (yargs) =>
    yargs.options({
      search: {
        type: 'string',
        description: 'Search text',
      },
      'page-offset': {
        type: 'number',
        description: 'Number of items to skip',
        default: 0,
      },
      'page-size': {
        type: 'number',
        description: 'Number of items to return',
        default: 50,
      },
      host: {
        type: 'string',
        alias: 'h',
        description: 'API host URL (overrides default)',
      },
    }),
  handler: async (argv) => {
    try {
      const client = argv.host ? createClientWithHost(argv.host) : createClient();
      const result = await listUsers(client, {
        query: {
          searchText: argv.search,
          pageOffset: argv['page-offset'],
          pageSize: argv['page-size'],
        },
      });

      console.log(`Found ${result.rowCount} user(s):`);
      if (result.rows.length === 0) {
        console.log('  (no users found)');
      } else {
        result.rows.forEach((user: { id: number; name: string }) => {
          console.log(`  - ${user.name} (ID: ${user.id})`);
        });
      }
    } catch (error) {
      console.error(`✗ List users failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  },
});
