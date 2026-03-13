import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import netlify from "@netlify/vite-plugin";



export default defineConfig({
  plugins: [
    tailwindcss(),
    netlify()

  ],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
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
