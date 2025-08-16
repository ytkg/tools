/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSitemap from 'vite-plugin-sitemap'
import { toolsData } from './src/tools/data'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSitemap({
      hostname: 'https://tools.takagi.dev',
      dynamicRoutes: toolsData.map((tool) => `/${tool.path}`),
      exclude: ['/404'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
