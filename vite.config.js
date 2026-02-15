import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base so the build works on GitHub Pages and any other subpath
  // without needing to hardcode the repo name.
  base: './',
})
