import { toCamelCase } from '@template-typescript-monorepo/common-lib';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json');

export const main = async () => {
  console.log(`${packageInfo.name} v${packageInfo.version}`);

  throw new Error();
  console.log(toCamelCase('hello World!'));
};
