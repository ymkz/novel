import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: { '~': resolve(__dirname, 'app') },
  },
  ssr: {
    external: ['async_hooks'],
  },
  test: {
    restoreMocks: true,
    silent: true,
  },
})
