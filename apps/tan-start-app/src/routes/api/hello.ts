import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => new Response(`Hello, World! from ${request.url}`),
    },
  },
});
