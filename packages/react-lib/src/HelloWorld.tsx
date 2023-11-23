import { toCamelCase } from '@bhouston/common-lib';
import React from 'react';

export interface HelloWorldProps {
  name: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
    <h1 className="text-6xl text-green mb-6">Hello, {name}!</h1>
    <p className="text-xl text-black">
      {toCamelCase('Welcome to our Tailwind CSS + React app using Vite!')}
    </p>
  </div>
);
