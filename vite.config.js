import { defineConfig } from 'vite';
import VitePluginCss from 'vite-plugin-css'

export default defineConfig({
  base: '/',
  server: {
    open: true,
    host: true
  },

  build: {
    // Output directory for build files
    outDir: 'dist',
  },

  plugins: [
    VitePluginCss({
      minify: true // Enable CSS minification
    }),
  ],
});