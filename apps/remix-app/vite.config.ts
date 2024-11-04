import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/server-runtime' {
  interface FutureConfig {
    unstable_singleFetch: true;
  }
}

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      compression({
        algorithm: 'brotliCompress'
      }),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true
        }
      }),
      tsconfigPaths()
    ],
    server: {
      port: isDev ? 3000 : undefined
    },
    define: {},
    clearScreen: false
  };
});
