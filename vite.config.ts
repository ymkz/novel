import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			plugins: [tailwindcss()],
			build: {
				rollupOptions: {
					input: 'app/client.tsx',
					output: { entryFileNames: 'static/client.js' },
				},
			},
		}
	}

	return {
		clearScreen: false,
		server: { port: 3000 },
		ssr: { external: ['react', 'react-dom'] },
		plugins: [tailwindcss(), pages(), devServer({ adapter, entry: 'app/server.ts' })],
	}
})
