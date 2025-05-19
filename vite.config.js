import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/', // 👈 add this line
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
    src: '/icon-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: '/icon-512x512.png',
    sizes: '512x512',
    type: 'image/png'
  }
]
      }
    })
  ]
});
