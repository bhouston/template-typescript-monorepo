import { toCamelCase } from '@esbuild-ts-monorepo/common-lib';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json');

export const main = async () => {
  console.log(`${packageInfo.name} v${packageInfo.version}`);

  console.log(toCamelCase('hello World!'));
};
