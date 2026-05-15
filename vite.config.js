import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'transparent-png-maker': resolve(__dirname, 'transparent-png-maker/index.html')
      }
    }
  }
});
