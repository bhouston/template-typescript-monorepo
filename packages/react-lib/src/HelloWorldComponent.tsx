import { toCamelCase } from '@esbuild-ts-monorepo/common-lib';
import React from 'react';

export const HelloWorldComponent: React.FC = () => (
  <h1>{toCamelCase('hello world')}</h1>
);
