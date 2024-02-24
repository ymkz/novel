import path from 'node:path'
import pages from '@hono/vite-cloudflare-pages'
import { getEnv } from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: { '~': path.resolve(__dirname, 'app') },
  },
  server: {
    open: false,
    port: 3000,
  },
  plugins: [
    honox({ devServer: { env: getEnv({ d1Databases: ['D1'], d1Persist: true }) } }),
    pages(),
  ],
})
