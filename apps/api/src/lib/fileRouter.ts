import { readdir } from 'node:fs/promises';
import { extname, join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

// Remix-style file conventions: `api/users/$id/get.ts` -> GET /api/users/{id},
// `files/$.get.ts` -> splat, `(group)` directories are dropped, `_`/`.`-prefixed and test files are ignored.
const methods = new Set(['delete', 'get', 'head', 'patch', 'post', 'put']);
const extensions = new Set(['.js', '.ts']);
const exclude = /(^|\/)[._]|\.(test|spec)\.[jt]s$|\.d\.ts$/;
const validSegment = /^\$?[\w-]*$/;
const sortKey = (path: string) => path.replaceAll('*', '~');

export type FileRouteSchema = Omit<RouteConfig, 'method' | 'path'>;

/** Method and path come from the file name; the schema and handler are @hono/zod-openapi's. */
export const defineRoute = <S extends FileRouteSchema>(route: {
  schema: S;
  handler: RouteHandler<S & { method: 'get'; path: string }>;
}) => route;

/** Converts a routes-relative, `/`-separated file path to an HTTP method and OpenAPI path. */
export const toRoute = (file: string) => {
  const dirs = file.split('/');
  const fileSegments = dirs.pop()?.split('.') ?? [];
  fileSegments.pop(); // extension
  const method = fileSegments.pop();
  if (!method || !methods.has(method)) throw new Error(`Invalid method "${method}" in route file ${file}`);

  const segments = [...dirs.filter((d) => !/^\(.+\)$/.test(d)), ...fileSegments];
  const path = segments.map((s) => {
    if (!validSegment.test(s)) throw new Error(`Invalid segment "${s}" in route file ${file}`);
    if (s === '$') return '*';
    return s.startsWith('$') ? `{${s.slice(1)}}` : s;
  });
  return { method: method as RouteConfig['method'], path: `/${path.join('/')}` };
};

export const registerFileRoutes = async (app: OpenAPIHono, routesDir: string) => {
  const files = (await readdir(routesDir, { recursive: true }))
    .map((f) => f.split(sep).join('/'))
    .filter((f) => extensions.has(extname(f)) && !exclude.test(f));

  const routes = await Promise.all(
    files.map(async (file) => {
      const { route } = await import(pathToFileURL(join(routesDir, file)).href);
      if (typeof route?.handler !== 'function') {
        throw new Error(`Route file ${file} must export \`route\` from defineRoute()`);
      }
      return { ...toRoute(file), schema: route.schema, handler: route.handler };
    }),
  );

  // Hono matches in registration order, so register static segments before {params} and * ('{' and '~' sort last).
  routes.sort((a, b) => (sortKey(a.path) < sortKey(b.path) ? -1 : 1));
  for (const { method, path, schema, handler } of routes) {
    app.openapi({ ...schema, method, path }, handler);
  }
};
