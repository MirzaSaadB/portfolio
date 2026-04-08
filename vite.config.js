import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-base-url',
      transformIndexHtml(html, ctx) {
        // Netlify serves from the root, so we use '/' regardless of environment
        return html.replace(/%BASE_URL%/g, '/');
      }
    }
  ],
  base: "/",
})
