// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': 'http://localhost:4001'
    },
    host: '0.0.0.0' // allow external connections
  }
});
