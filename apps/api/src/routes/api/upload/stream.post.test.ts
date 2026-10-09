import { randomUUID } from 'node:crypto';
import { readdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import app from '../../../app.js';

const tmpDir = fileURLToPath(new URL('../../../../tmp/', import.meta.url));
const upload = (name: string, body: string) =>
  app.request(`/api/upload/stream?name=${encodeURIComponent(name)}`, { method: 'POST', body });

describe('POST /api/upload/stream', () => {
  // Unique per run: vitest runs the src/ and dist/ copies of this file concurrently.
  const name = `stream-upload-test-${randomUUID()}.txt`;

  it('streams the body to tmp/ under its original name, overwriting and stripping paths', async () => {
    await upload(name, 'old');
    const res = await upload(`../../${name}`, 'hello');
    expect(await res.json()).toEqual({ name, size: 5 });
    expect(await readFile(`${tmpDir}${name}`, 'utf8')).toBe('hello');
    expect((await readdir(tmpDir)).filter((f) => f.startsWith(name))).toEqual([name]);
    await rm(`${tmpDir}${name}`);
  });

  it('rejects missing and unsafe names', async () => {
    expect((await app.request('/api/upload/stream', { method: 'POST', body: 'x' })).status).toBe(400);
    expect((await upload('..', 'x')).status).toBe(400);
  });
});
