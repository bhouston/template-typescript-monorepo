import { HelloWorldComponent } from '@esbuild-ts-monorepo/react-lib';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App(): React.JSX.Element {
  return (
    <>
      <HelloWorldComponent />
    </>
  );
}

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
