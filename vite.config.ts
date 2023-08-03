import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: 'pages', replacement: '/src/pages' },
      { find: 'components', replacement: '/src/components' },
      { find: 'utils', replacement: '/src/utils' },
      { find: 'hooks', replacement: '/src/hooks' },
    ],
  },
});
