import { HelloWorld } from '@bhouston/react-lib';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getFullHost } from '../getLocalHost.ts';

export const meta: MetaFunction = () => {
  return [
    { title: 'TypeScript Monorepo Template' },
    {
      name: 'description',
      content: 'A generic Typescript mono-repo template.'
    }
  ];
};

export const loader = async () => {
  const url = new URL('/api/health', getFullHost());
  const apiHealthy = await fetch(url.toString())
    .then((res) => res.ok)
    .catch(() => false);

  return { apiHealthy };
};

export default function Page() {
  const { apiHealthy } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HelloWorld name="Remix">
        {apiHealthy ? (
          <p className="text-green-500">API is healthy</p>
        ) : (
          <p className="text-red-500">API is not healthy</p>
        )}
      </HelloWorld>
    </div>
  );
}
