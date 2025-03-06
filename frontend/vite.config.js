import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist', // Ensures Vercel serves the correct folder
  },
  server: {
    port: 5173, // Optional: Set a default local dev server port
    open: true, // Optional: Auto-open browser on local run
  },
  base: '/', // Ensures correct asset paths on Vercel
});

