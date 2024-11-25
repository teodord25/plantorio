// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy WebSocket connections
      '/ws': {
        target: 'ws://localhost:8080', // Go server WebSocket endpoint
        ws: true,
        changeOrigin: true,
        // TODO: change to https before prod
        secure: false, // Set to true if using HTTPS
      },
    },
  },
});
