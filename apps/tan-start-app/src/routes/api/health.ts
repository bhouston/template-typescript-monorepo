import { createServerFileRoute } from '@tanstack/react-start/server';

export const ServerRoute = createServerFileRoute('/api/health').methods({
  GET: () => new Response(null, { status: 204 }),
});
