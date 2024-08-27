import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      assets: "/src/assets",
      context: "/src/context",
      routes: "/src/routes",
      utils: "/src/utils",
      pages: "/src/pages",
      store: "/src/zustand",
    },
  },
})
