import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    // Proxy AI function calls to Netlify Dev (run `netlify dev` for full AI support locally)
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
  // SPA fallback - redirect all routes to index.html for client-side routing
  appType: 'spa',
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
