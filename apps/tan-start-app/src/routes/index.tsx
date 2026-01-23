import { HelloWorld } from '@bhouston/react-lib';
import { createAnonymousClient, healthCheck, hello } from '@bhouston/sdk';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

const HomePage: React.FC = () => {
  // Create client on the client side
  const client = useMemo(() => {
    const apiHost = typeof window !== 'undefined' ? window.location.origin.replace(/:\d+$/, ':3001') : 'http://localhost:3001';
    return createAnonymousClient({ host: apiHost });
  }, []);

  // Query for health check
  const {
    data: apiHealthy,
    isLoading: isHealthLoading,
    isError: isHealthError,
  } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      await healthCheck(client);
      return true;
    },
  });

  // Query for hello message
  const {
    data: helloMessage,
    isLoading: isHelloLoading,
  } = useQuery({
    queryKey: ['hello', 'TanStack Start'],
    queryFn: async () => {
      const result = await hello(client, { query: { name: 'TanStack Start' } });
      return result.message;
    },
    enabled: apiHealthy === true, // Only run if health check passes
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HelloWorld name="@TanStack/Start">
        {isHealthLoading ? (
          <p className="text-gray-500">Checking API health...</p>
        ) : isHealthError ? (
          <p className="text-red-500">Fastify API is NOT healthy</p>
        ) : (
          <p className="text-green-500">Fastify API is healthy</p>
        )}
        {isHelloLoading ? (
          <p className="text-gray-500 mt-2">Loading hello message...</p>
        ) : (
          helloMessage && <p className="text-blue-500 mt-2">{helloMessage}</p>
        )}
      </HelloWorld>
    </div>
  );
};

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: "Ben Houston's TypeScript Monorepo Template",
      },
      {
        name: 'description',
        content: 'A generic Typescript mono-repo illustrating best practices.',
      },
    ],
  }),
  component: HomePage,
});
