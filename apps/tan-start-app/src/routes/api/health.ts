import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 204 }),
    },
  },
});
