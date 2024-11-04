import { toCamelCase } from '@bhouston/common-lib';
import React from 'react';

export type HelloWorldProps = {
  name: string;
  children?: React.ReactNode;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({ name, children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
    <h1 className="text-6xl text-green-500 mb-6">Hello, {name}!</h1>
    <p className="text-xl text-black">
      {toCamelCase('Welcome to our TailwindCSS + React app!')}
    </p>
    {children}
  </div>
);
