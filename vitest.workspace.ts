import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: '@bhouston/common-lib',
      root: './packages/common-lib',
      environment: 'node',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      pool: 'threads',
      poolOptions: {
        threads: {
          singleThread: false,
        },
      },
      coverage: {
        enabled: true,
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'test/',
          '**/*.d.ts',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/*.config.{js,ts}',
        ],
      },
      isolate: true,
    },
  },
  {
    test: {
      name: '@bhouston/node-lib',
      root: './packages/node-lib',
      environment: 'node',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      pool: 'threads',
      poolOptions: {
        threads: {
          singleThread: false,
        },
      },
      coverage: {
        enabled: true,
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'test/',
          '**/*.d.ts',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/*.config.{js,ts}',
        ],
      },
      isolate: true,
    },
  },
  {
    test: {
      name: '@bhouston/react-lib',
      root: './packages/react-lib',
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      pool: 'threads',
      poolOptions: {
        threads: {
          singleThread: false,
        },
      },
      coverage: {
        enabled: true,
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'test/',
          '**/*.d.ts',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/*.config.{js,ts}',
        ],
      },
      isolate: true,
    },
  },
])