import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      'packages/*',
      'apps/*',
      {
        test: {
          include: ['{app,src}/**/*.test.*'],
          environment: 'node',
        },
      },
    ],
    coverage: {
      include: ['packages/*/src/**/*.{ts,tsx}', 'apps/*/src/**/*.{ts,tsx}', 'apps/*/app/**/*.{ts,tsx}'],
      exclude: ['**/*.test.*', '**/*.spec.*', '**/node_modules/**'],
    },
  },
});
