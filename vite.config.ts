import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is env-driven so GitHub Pages (project site at /DoE-Prompt-Style-/)
// and local dev (/) both work without touching UI-owned files.
// Set VITE_BASE=/DoE-Prompt-Style-/ in the deploy workflow.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  },
  test: {
    globals: true,
    environment: 'node'
  }
})
