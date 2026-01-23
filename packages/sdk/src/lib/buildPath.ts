// This should match paths like: /api/$orgId/test or /api/$orgId/$projectId/test
const paramRegex = /\$(\w+)/g;

/**
 * Builds a path by replacing path parameters with their values.
 * The params object is type-checked to match the parameters in the path string.
 *
 * @param path - Path template with parameters like `/api/$orgId/test`
 * @param params - Object containing parameter values matching the path template
 * @returns Resolved path with parameters substituted
 *
 * @example
 * ```typescript
 * buildPath('/users/$userName', { userName: 'john-doe' })
 * // Returns: '/users/john-doe'
 *
 * // Type error if parameter is missing:
 * buildPath('/users/$userName', {}) // Error: Property 'userName' is missing
 * ```
 */
export const buildPath = (path: string, params: Record<string, string | number>): string => {
  // Collect all parameter names used in the path
  const pathParams = new Set<string>();
  for (const match of path.matchAll(paramRegex)) {
    const paramName = match[1]; // Extract parameter name without $ prefix (capture group)
    if (paramName) {
      pathParams.add(paramName);
      // Check if param exists in params object
      if (!(paramName in params)) {
        throw new Error(`Param $${paramName} from path ${path} is not in the params object: ${JSON.stringify(params)}`);
      }
    }
  }

  // Check for unused parameters
  const remainingParams = Object.keys(params).filter((key) => !pathParams.has(key));
  if (remainingParams.length > 0) {
    throw new Error(
      `Params ${remainingParams.join(', ')} from path ${path} are not all used: ${JSON.stringify(params)}`,
    );
  }

  return path.replace(paramRegex, (_match, p1) => {
    const param = (params as Record<string, string | number>)[p1];
    if (param === undefined || param === null) {
      throw new Error(`Param ${p1} from path ${path} is not in the params object: ${JSON.stringify(params)}`);
    }
    return encodeURIComponent(String(param));
  });
};
