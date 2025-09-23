import { createRequire } from 'module';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileCommands } from 'yargs-file-commands';

import type { PackageJson } from 'type-fest';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json') as PackageJson;
const distDir = path.dirname(fileURLToPath(import.meta.url));

export const main = async () => {
  const commandsDir = path.join(distDir, 'commands');

  const { name, version } = packageInfo;
  if (!name || !version) {
    throw new Error('Package info is not valid, name and version required');
  }

  return yargs(hideBin(process.argv))
    .scriptName(name)
    .version(version)
    .command(await fileCommands({ commandDirs: [commandsDir] }))
    .demandCommand(
      1,
      'No command specified - use --help for available commands',
    )
    .showHelpOnFail(true)
    .help().argv;
};
