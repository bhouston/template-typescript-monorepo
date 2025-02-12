import * as z from 'zod';

export const uuidSchema = z.string().uuid();
export const hexColorSchema = z.string().regex(/^#([0-9a-f]{3}){1,2}$/i);
