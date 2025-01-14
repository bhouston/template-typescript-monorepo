// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/health')({
  GET: async () => {
    return new Response(null, { status: 204 });
  }
});
