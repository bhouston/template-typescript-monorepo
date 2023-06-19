import { getHelloWorld } from '@esbuild-ts-monorepo/vanilla-lib';
import { name, version } from '../package.json';

export const main = async () => {
  console.log(`${name} v${version}`);

  console.log(getHelloWorld());
};
