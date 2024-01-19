import path from 'node:path'
import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import { getEnv } from '@hono/vite-dev-server/cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: false,
    port: 3000,
  },
  plugins: [
    pages(),
    devServer({
      // @see https://github.com/honojs/vite-plugins/tree/main/packages/dev-server#cloudflare-pages
      entry: 'src/index.ts',
      env: getEnv({
        d1Databases: ['D1'],
        d1Persist: true,
      }),
    }),
  ],
})
