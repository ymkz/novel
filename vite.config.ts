import { resolve } from 'node:path'
import cloudflarePages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import devServerCloudflare from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    cloudflarePages(), // break line for formater
    devServer({ adapter: devServerCloudflare, entry: 'app/server.ts' }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  clearScreen: false,
})
