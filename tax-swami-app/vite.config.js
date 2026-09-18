import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the production build also works when opened directly
  // from disk (file://) and not just from a web server.
  base: './',
})
