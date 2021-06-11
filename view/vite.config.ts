import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [reactRefresh()],
  esbuild: { jsxInject: `import React from 'react'` },
  server: { proxy: { '^/api': { target: 'http://127.0.0.1:3001' } } },
})
