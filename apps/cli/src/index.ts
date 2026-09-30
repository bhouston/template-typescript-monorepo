import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { createDocgenCommand, fromYargsAsync } from '@clidoc/yargs';
import type { PackageJson } from 'type-fest';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileCommands } from 'yargs-file-commands';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json') as PackageJson;
const distDir = path.dirname(fileURLToPath(import.meta.url));

export const main = async () => {
  const commandsDir = path.join(distDir, 'commands');

  const { name, version } = packageInfo;
  if (!name || !version) {
    throw new Error('Package info is not valid, name and version required');
  }

  const commands = await fileCommands({ commandDirs: [commandsDir] });
  const docgen = createDocgenCommand(() =>
    fromYargsAsync([...commands, docgen], { title: name, binary: name, version }),
  );

  return yargs(hideBin(process.argv))
    .scriptName(name)
    .version(version)
    .command([...commands, docgen])
    .demandCommand(1, 'No command specified - use --help for available commands')
    .showHelpOnFail(true)
    .help().argv;
};
