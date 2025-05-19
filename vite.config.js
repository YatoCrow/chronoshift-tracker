import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Chronoshift Tracker',
        short_name: 'Chronoshift',
        description: 'Time-shifting fantasy tracker for Chronoshift TCG',
        start_url: '.',
        display: 'standalone',
        background_color: '#121212',
        theme_color: '#1a1a1a',
        orientation: 'portrait',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '48x48 72x72 96x96 128x128 256x256',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ]
});
