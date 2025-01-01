import type { ArgumentsCamelCase, Argv } from 'yargs';

export const describe = 'Hello world command';

export const builder = (args: Argv): Argv => {
  return args;
};

export const handler = async (_args: ArgumentsCamelCase) => {
  console.log('Hello world!');
};
