import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    // Build-time recompression safety net. Source copies are already downscaled
    // by scripts/optimize-images.mjs (run via `npm run prebuild`); this keeps
    // any newly added assets optimized too.
    ViteImageOptimizer({
      jpg: { quality: 78 },
      jpeg: { quality: 78 },
      png: { quality: 80 },
    }),
  ],
  build: {
    // Split the heavy framer-motion lib out of the initial bundle.
    rollupOptions: {
      output: {
        manualChunks: { motion: ['framer-motion'] },
      },
    },
  },
})
