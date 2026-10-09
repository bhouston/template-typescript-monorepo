import { randomInt } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { ReadableStream } from 'node:stream/web';
import { fileURLToPath } from 'node:url';

import { z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { defineRoute } from '../../../lib/fileRouter.js';

// apps/api/tmp, from both src/ and dist/.
const uploadDir = fileURLToPath(new URL('../../../../tmp/', import.meta.url));

export const route = defineRoute({
  schema: {
    description: 'Upload a file as the raw request body; it is streamed to disk without buffering.',
    tags: ['utility'],
    operationId: 'upload-stream',
    summary: 'Upload file (streaming)',
    request: {
      query: z.strictObject({ name: z.string().min(1) }),
      body: { content: { 'application/octet-stream': { schema: z.string().openapi({ format: 'binary' }) } } },
    },
    responses: {
      200: {
        description: 'Saved file',
        content: { 'application/json': { schema: z.object({ name: z.string(), size: z.number() }) } },
      },
    },
  },

  // Raw body, not multipart: Hono's parseBody()/formData() buffer the whole request in memory.
  handler: async (c) => {
    const name = basename(c.req.valid('query').name); // strip any client-supplied path to prevent traversal
    if (name === '.' || name === '..') throw new HTTPException(400, { message: 'Invalid file name' });
    const body = c.req.raw.body;
    if (!body) throw new HTTPException(400, { message: 'Missing body' });

    await mkdir(uploadDir, { recursive: true });
    const finalPath = join(uploadDir, name);
    const tmpPath = `${finalPath}-${randomInt(1e9)}.tmp`;
    const out = createWriteStream(tmpPath);
    try {
      await pipeline(Readable.fromWeb(body as ReadableStream), out);
      await rename(tmpPath, finalPath); // replaces any existing file
    } catch (err) {
      await rm(tmpPath, { force: true });
      throw err;
    }
    return c.json({ name, size: out.bytesWritten }, 200);
  },
});
