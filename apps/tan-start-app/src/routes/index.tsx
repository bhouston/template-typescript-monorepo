import { HelloWorld } from '@bhouston/react-lib';
import { createAnonymousClient, healthCheck, hello } from '@bhouston/sdk';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

const HomePage: React.FC = () => {
  // Create client on the client side
  const client = useMemo(() => {
    const apiHost =
      typeof window !== 'undefined' ? window.location.origin.replace(/:\d+$/, ':3001') : 'http://localhost:3001';
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
  const { data: helloMessage, isLoading: isHelloLoading } = useQuery({
    queryKey: ['hello', 'TanStack Start'],
    queryFn: async () => {
      const result = await hello(client, { query: { name: 'TanStack Start' } });
      return result.message;
    },
    enabled: apiHealthy === true, // Only run if health check passes
  });

  // Multipart goes through Hono's buffering form parser; stream sends the raw file so the API can pipe it to disk.
  const upload = useMutation({
    mutationFn: async ({ file, stream }: { file: File; stream: boolean }) => {
      const body = new FormData();
      body.append('file', file);
      const res = stream
        ? await fetch(`${client.host}/api/upload/stream?name=${encodeURIComponent(file.name)}`, {
            method: 'POST',
            body: file,
          })
        : await fetch(`${client.host}/api/upload`, { method: 'POST', body });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      return (await res.json()) as { name: string; size: number };
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HelloWorld name="@TanStack/Start">
        {isHealthLoading ? (
          <p className="text-gray-500">Checking API health...</p>
        ) : isHealthError ? (
          <p className="text-red-500">Hono API is NOT healthy</p>
        ) : (
          <p className="text-green-500">Hono API is healthy</p>
        )}
        {isHelloLoading ? (
          <p className="text-gray-500 mt-2">Loading hello message...</p>
        ) : (
          helloMessage && <p className="text-blue-500 mt-2">{helloMessage}</p>
        )}
        {[false, true].map((stream) => (
          <label key={String(stream)} className="block mt-4">
            <span className="text-gray-700">{stream ? 'Upload (streaming): ' : 'Upload (multipart): '}</span>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload.mutate({ file, stream });
              }}
            />
          </label>
        ))}
        {upload.isPending && <p className="text-gray-500 mt-2">Uploading...</p>}
        {upload.isError && <p className="text-red-500 mt-2">{upload.error.message}</p>}
        {upload.data && (
          <p className="text-green-500 mt-2">
            Saved {upload.data.name} ({upload.data.size} bytes)
          </p>
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
