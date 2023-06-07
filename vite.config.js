import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: "modules",
    lib: {
      entry: resolve(__dirname, 'dist/index.js'),
      name: 'clock',
      fileName: 'clock'
    },
    emptyOutDir: false,
    rollupOptions: {

    },
  },
})
