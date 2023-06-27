import { toCamelCase } from '../../common-lib/dist';
import React from 'react';

export const HelloWorldComponent: React.FC = () => (
  <h1>{toCamelCase('hello world')}</h1>
);
