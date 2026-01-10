import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  root: './examples',
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@a2ui/solid': '/src'
    }
  }
});
