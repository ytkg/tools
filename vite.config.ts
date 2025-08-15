/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSitemap from 'vite-plugin-sitemap'
import { toolList } from './src/data/tools-list'

interface Tool {
  path: string;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSitemap({
      hostname: 'https://tools.takagi.dev',
      dynamicRoutes: toolList.map((tool: Tool) => tool.path),
      exclude: ['/404'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
