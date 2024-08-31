import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      assets: "/src/assets",
      context: "/src/context",
      routes: "/src/routes",
      utils: "/src/utils",
      pages: "/src/pages",
      store: "/src/zustand",
    },
  },
  build: {
    outDir: 'dist'
  }
})
