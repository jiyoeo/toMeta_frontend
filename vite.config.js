import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tometa-final.duckdns.org',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
