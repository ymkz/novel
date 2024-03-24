import { defineConfig } from 'vite'

import cloudflarePages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import devServerCloudflare from '@hono/vite-dev-server/cloudflare'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    cloudflarePages(),
    devServer({ adapter: devServerCloudflare, entry: 'app/server.ts' }),
  ],
  server: {
    port: 3000,
    open: false,
  },
  clearScreen: false,
})
