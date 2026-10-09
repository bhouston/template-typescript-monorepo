import { readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import app from '../../../app.js';

const upload = (file: File) => {
  const body = new FormData();
  body.append('file', file);
  return app.request('/api/upload', { method: 'POST', body });
};

describe('POST /api/upload', () => {
  it('saves the file under tmp/ with its original name, stripping paths', async () => {
    const res = await upload(new File(['hello'], '../../evil-upload-test.txt', { type: 'text/plain' }));
    expect(await res.json()).toEqual({ name: 'evil-upload-test.txt', size: 5, type: 'text/plain' });
    const saved = fileURLToPath(new URL('../../../../tmp/evil-upload-test.txt', import.meta.url));
    expect(await readFile(saved, 'utf8')).toBe('hello');
    await rm(saved);
  });

  it('rejects missing file and unsafe names', async () => {
    expect((await app.request('/api/upload', { method: 'POST', body: new FormData() })).status).toBe(400);
    expect((await upload(new File(['x'], '..'))).status).toBe(400);
  });
});
