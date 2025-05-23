import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/images/*', dest: 'assets/images' },
        { src: 'src/assets/svg/*', dest: 'assets/svg' }
      ]
    })
  ],
  base: '/PortfolioInReact/'
});