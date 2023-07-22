import React, { useEffect, useMemo, useState } from 'react';
import { HelloWorld } from '@esbuild-ts-monorepo/react-lib';

const Viewer: React.FC = () => {
  return (
    <div className="text-center mt-4">
      <HelloWorld name="Viewer" />
    </div>
  );
};

export default Viewer;
