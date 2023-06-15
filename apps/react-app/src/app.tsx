import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HelloWorldComponent } from '@esbuild-ts-monorepo/react-lib';

function App(): React.JSX.Element {
  return (<>
      <HelloWorldComponent />
    </>);
}

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App/>);