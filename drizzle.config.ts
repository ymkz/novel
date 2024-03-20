import type { Config } from 'drizzle-kit'

export default {
  schema: 'app/datasource/d1/schema.ts',
  out: 'db/migration',
  driver: 'd1',
  dbCredentials: { wranglerConfigPath: 'wrangler.toml', dbName: 'novels' },
} satisfies Config
