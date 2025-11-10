import type { ArgumentsCamelCase, Argv } from 'yargs';

export const describe = 'Hello world command';

export const builder = (args: Argv): Argv => args;

export const handler = (_args: ArgumentsCamelCase) => {
  console.log('Hello world!');
};
