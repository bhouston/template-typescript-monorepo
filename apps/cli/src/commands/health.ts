import { healthCheck } from '@bhouston/sdk';
import { defineCommand } from 'yargs-file-commands';
import { createClient, createClientWithHost } from '../lib/client.js';

export const command = defineCommand({
  command: 'health',
  describe: 'Check if the API server is healthy and reachable',
  builder: (yargs) =>
    yargs.options({
      host: {
        type: 'string',
        alias: 'h',
        description: 'API host URL (overrides default)',
      },
    }),
  handler: async (argv) => {
    try {
      const client = argv.host ? createClientWithHost(argv.host) : createClient();
      await healthCheck(client);

      console.log(`✓ Server is healthy at ${client.host}`);
    } catch (error) {
      console.error(`✗ Health check failed: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  },
});
