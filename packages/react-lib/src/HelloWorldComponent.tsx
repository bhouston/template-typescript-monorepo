import { getHelloWorld } from '@esbuild-ts-monorepo/vanilla-lib';
import React from 'react';

export const HelloWorldComponent: React.FC = () => <h1>{getHelloWorld()}</h1>;
