import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-base-url',
      transformIndexHtml(html, ctx) {
        return html.replace(/%BASE_URL%/g, ctx.server ? '/' : '/portfolio/');
      }
    }
  ],
  base: "/portfolio/",
})
