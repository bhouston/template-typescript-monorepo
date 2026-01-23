import * as z from 'zod';

/**
 * Zod schema for health check response.
 * Health endpoint returns 204 No Content, so this is just for type consistency.
 */
export const healthCheckResultSchema = z.null().describe('Successful health check response');

export type HealthCheckResult = z.infer<typeof healthCheckResultSchema>;
