import * as z from 'zod';

/**
 * Zod schema for hello endpoint query parameters.
 */
export const helloQuerySchema = z.strictObject({
  name: z.string().optional().describe('Optional name parameter'),
});

export type HelloQuery = z.infer<typeof helloQuerySchema>;

/**
 * Zod schema for hello endpoint response.
 */
export const helloResultSchema = z.object({
  message: z.string().describe('Greeting message'),
});

export type HelloResult = z.infer<typeof helloResultSchema>;
