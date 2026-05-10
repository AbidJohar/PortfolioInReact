import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep font names readable instead of hashed
          if (/\.(ttf|otf|woff|woff2)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name][extname]'; // ← predictable name
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }

});