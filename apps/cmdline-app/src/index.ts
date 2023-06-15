import { getHelloWorld } from '@esbuild-ts-monorepo/vanilla-lib';

export const main = async () => {
    console.log( getHelloWorld() );
}