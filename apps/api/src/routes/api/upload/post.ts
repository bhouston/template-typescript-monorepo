import { mkdir, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { defineRoute } from '../../../lib/fileRouter.js';

// apps/api/tmp, from both src/ and dist/.
const uploadDir = fileURLToPath(new URL('../../../../tmp/', import.meta.url));

const uploadFormSchema = z.object({
  file: z.instanceof(File).openapi({ type: 'string', format: 'binary' }),
});

export const route = defineRoute({
  schema: {
    description: 'Upload a single file as multipart/form-data field "file"',
    tags: ['utility'],
    operationId: 'upload',
    summary: 'Upload file',
    request: { body: { content: { 'multipart/form-data': { schema: uploadFormSchema } }, required: true } },
    responses: {
      200: {
        description: 'Saved file',
        content: { 'application/json': { schema: z.object({ name: z.string(), size: z.number(), type: z.string() }) } },
      },
    },
  },

  // ponytail: parseBody buffers the whole file in memory with no size cap; /api/upload/stream avoids that.
  handler: async (c) => {
    const { file } = c.req.valid('form');
    const name = basename(file.name); // strip any client-supplied path to prevent traversal
    if (!name || name === '.' || name === '..') throw new HTTPException(400, { message: 'Invalid file name' });
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, name), new Uint8Array(await file.arrayBuffer()));
    return c.json({ name, size: file.size, type: file.type }, 200);
  },
});
