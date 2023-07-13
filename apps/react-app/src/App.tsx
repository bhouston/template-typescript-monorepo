import React, { useEffect, useMemo, useState } from 'react';
import { HelloWorld } from '@esbuild-ts-monorepo/react-lib';

const App: React.FC = () => {
  const [serverMessage, setServerMessage] = useState<string>();

  useMemo(() => {
    fetch('/api/get-message').then(async (res) => {
      const json = await res.json();
      setServerMessage(json.message);
    });
  }, []);

  return (
    <div className="text-center mt-4">
      <HelloWorld name={serverMessage ?? ''} />
    </div>
  );
};

export default App;
