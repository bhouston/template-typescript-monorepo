import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { createDocgenCommand, fromYargs, type YargsCommandModule } from '@clidoc/yargs';
import type { PackageJson } from 'type-fest';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileCommands } from 'yargs-file-commands';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json') as PackageJson;
const distDir = path.dirname(fileURLToPath(import.meta.url));

type Builder = (yargs: Record<string, unknown>) => unknown;

// ponytail: @clidoc/yargs 0.1.1 reads `.command([modules])` (how yargs-file-commands nests) as string
// patterns, so spread such arrays into single calls; drop once bhouston/clidoc#173 ships.
const spreadNestedCommands = (module: YargsCommandModule): YargsCommandModule => {
  const { builder } = module;
  if (typeof builder !== 'function') return module;
  return {
    ...module,
    builder: (recorder: Record<string, unknown>) => {
      const command = recorder.command as (...args: unknown[]) => unknown;
      const proxy: Record<string, unknown> = new Proxy(recorder, {
        get: (target, key, receiver) =>
          key === 'command'
            ? (first: unknown, ...rest: unknown[]) => {
                if (Array.isArray(first) && typeof first[0] === 'object') {
                  for (const child of first) command.call(target, spreadNestedCommands(child as YargsCommandModule));
                } else {
                  command.call(target, first, ...rest);
                }
                return proxy;
              }
            : Reflect.get(target, key, receiver),
      });
      return (builder as Builder)(proxy);
    },
  };
};

export const main = async () => {
  const commandsDir = path.join(distDir, 'commands');

  const { name, version } = packageInfo;
  if (!name || !version) {
    throw new Error('Package info is not valid, name and version required');
  }

  const commands = await fileCommands({ commandDirs: [commandsDir] });
  const docgen = createDocgenCommand(() =>
    fromYargs([...commands, docgen].map(spreadNestedCommands), { title: name, binary: name, version }),
  );

  return yargs(hideBin(process.argv))
    .scriptName(name)
    .version(version)
    .command([...commands, docgen])
    .demandCommand(1, 'No command specified - use --help for available commands')
    .showHelpOnFail(true)
    .help().argv;
};
