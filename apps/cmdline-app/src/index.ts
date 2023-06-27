import { toCamelCase } from '@esbuild-ts-monorepo/common-lib';

import { name, version } from '../package.json';

export const main = async () => {
  console.log(`${name} v${version}`);

  console.log(toCamelCase('hello World!'));
};
