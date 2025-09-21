import { createServerFileRoute } from '@tanstack/react-start/server';

export const ServerRoute = createServerFileRoute('/api/hello').methods({
  GET: ({ request }: { request: Request }) => {
    return new Response('Hello, World! from ' + request.url);
  },
});
