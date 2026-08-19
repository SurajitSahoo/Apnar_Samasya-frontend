import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    host: '0.0.0.0',

    allowedHosts: [
      'apnar-samasya-frontend-latest-1.onrender.com',
      'apnar-samasya-frontend-latest.onrender.com'
    ]
  }
})