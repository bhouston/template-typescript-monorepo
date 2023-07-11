import React from 'react';
import { HelloWorld } from '@esbuild-ts-monorepo/react-lib';

const App: React.FC = () => (
  <div className="text-center mt-4">
    <HelloWorld name="World" />
  </div>
);

export default App;
