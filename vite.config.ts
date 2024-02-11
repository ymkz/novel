import path from 'node:path'
import pages from '@hono/vite-cloudflare-pages'
import { getEnv } from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import { defineConfig } from 'vite'

const commonConfig = defineConfig({
  clearScreen: false,
  server: { open: false, port: 3000 },
  resolve: { alias: { '~': path.resolve(__dirname, 'app') } },
})

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      ...commonConfig,
      plugins: [client()],
    }
  }
  return {
    ...commonConfig,
    plugins: [
      honox({ devServer: { env: getEnv({ d1Databases: ['D1'], d1Persist: true }) } }),
      pages(),
    ],
  }
})
