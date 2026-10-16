/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O GitHub Pages publica em https://will-ifes.github.io/typeScriptAndReactProject/
export default defineConfig({
  base: '/typeScriptAndReactProject/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
