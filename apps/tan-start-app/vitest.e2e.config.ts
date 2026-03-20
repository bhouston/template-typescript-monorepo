import process from 'node:process';

import { playwright } from '@vitest/browser-playwright';
import tailwindcss from '@tailwindcss/vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

import { openAppPage } from './e2e/openAppPage';

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    nitroV2Plugin({ preset: 'node-server', compatibilityDate: '2025-11-07' }),
    tailwindcss(),
    viteReact(),
  ],
  test: {
    include: ['e2e/**/*.e2e.*'],
    browser: {
      enabled: true,
      headless: process.env.CI === 'true',
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      commands: {
        openAppPage,
      },
    },
    globalSetup: ['./e2e/globalSetup.ts'],
  },
});
