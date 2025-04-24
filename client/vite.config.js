import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: process.env.PORT || 5173, // If the PORT env is set, use it; otherwise, default to 5173
  },
  
  plugins: [
    react(),tailwindcss()],
})
