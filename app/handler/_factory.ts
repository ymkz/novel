import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { createFactory } from 'hono/factory'

type Env = {
  Variables: { db: DrizzleD1Database }
  Bindings: { DB: D1Database }
}

export const factory = createFactory<Env>()
