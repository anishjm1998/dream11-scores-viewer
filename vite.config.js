import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dream11-scores-viewer/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets', 
  }
})