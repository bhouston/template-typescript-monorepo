import process from 'node:process';

import tailwindcss from '@tailwindcss/vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  server: {
    port: parseInt(process.env.PORT ?? '8080', 10)
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    nitroV2Plugin({ preset: 'node-server', compatibilityDate: '2025-11-07' }),
    tailwindcss(),
    viteReact(),
  ]
});
