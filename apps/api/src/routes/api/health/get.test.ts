import { describe, expect, it } from 'vitest';

import app from '../../../app.js';

describe('API', () => {
  it('GET /api/health responds 204', async () => {
    expect((await app.request('/api/health')).status).toBe(204);
  });

  it('validates query with SDK schema', async () => {
    const ok = await app.request('/api/hello?name=Ben');
    expect(await ok.json()).toEqual({ message: 'Hello, Ben!' });
    expect((await app.request('/api/hello?bogus=1')).status).toBe(400); // strictObject
    expect((await app.request('/api/users?pageSize=5000')).status).toBe(400); // max(1000)
  });

  it('validates path params with SDK schema', async () => {
    expect((await app.request('/api/users/test-user')).status).toBe(200);
    expect((await app.request('/api/users/no-such')).status).toBe(404);
    expect((await app.request('/api/users/bad--name')).status).toBe(400);
  });

  it('returns 500 JSON for thrown errors', async () => {
    const res = await app.request('/api/health/error');
    expect(res.status).toBe(500);
  });

  it('serves OpenAPI generated from SDK schemas', async () => {
    const doc = (await (await app.request('/openapi.json')).json()) as {
      paths: Record<string, { get: { parameters: { name: string }[] } }>;
    };
    expect(Object.keys(doc.paths)).toContain('/api/users/{userName}');
    expect(doc.paths['/api/users']?.get.parameters.map((p: { name: string }) => p.name)).toContain('pageSize');
  });
});
