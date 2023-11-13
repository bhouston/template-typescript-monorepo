import { toCamelCase } from '@template-typescript-monorepo/common-lib';
import { createRequire } from 'module';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json');

type CommandLineArgs = {
  error: boolean;
};

export const main = async () => {
  const argv = (await yargs(hideBin(process.argv))
    .version(packageInfo.version)
    .options({
      error: {
        type: 'boolean',
        default: false,
        description: 'Throw an error'
      }
    }).argv) as CommandLineArgs;

  if (argv.error) {
    throw new Error();
  }
  console.log(toCamelCase('hello World!'));
};
