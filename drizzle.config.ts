import type { Config } from 'drizzle-kit'

export default {
	schema: 'app/datasource/d1/schema/*',
	out: 'db/migration',
	dialect: 'sqlite',
	driver: 'd1-http',
} satisfies Config
