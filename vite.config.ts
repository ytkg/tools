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
      // Include language-prefixed routes for all tools and language roots
      dynamicRoutes: (() => {
        const locales = ['ja', 'en'];
        const toolRoutes = toolsData.map((tool) => tool.path);
        return locales.flatMap((lng) => [
          `/${lng}`,
          ...toolRoutes.map((p) => `/${lng}/${p}`),
        ]);
      })(),
      exclude: ['/404'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
