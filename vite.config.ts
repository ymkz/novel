import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			build: {
				rollupOptions: {
					input: 'src/client/index.tsx',
					output: { entryFileNames: 'static/client/index.js' },
				},
			},
		}
	}

	return {
		clearScreen: false,
		server: { port: 3000 },
		ssr: { external: ['react', 'react-dom'] },
		plugins: [pages(), devServer({ adapter, entry: 'src/server/index.ts' })],
	}
})
