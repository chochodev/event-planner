import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@/": "/src",
      components: "/src/components",
      assets: "/src/assets",
      context: "/src/context",
      routes: "/src/routes",
      utils: "/src/utils",
      pages: "/src/pages",
      store: "/src/zustand",
      ui: "/src/components/ui",
      "@/zustand" : "/src/zustand",
    },
  },
  build: {
    outDir: 'dist'
  },
  css: {
    postcss: {
      plugins: [tailwindcss('./tailwind.config.js')],
    },
  },
})
