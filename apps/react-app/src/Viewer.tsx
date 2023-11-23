import { HelloWorld } from '@template-typescript-monorepo/react-lib';
import React from 'react';

const Viewer: React.FC = () => {
  return (
    <div className="text-center mt-4">
      <HelloWorld name="Viewer" />
    </div>
  );
};

export default Viewer;
