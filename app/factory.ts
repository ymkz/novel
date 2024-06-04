import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle } from 'drizzle-orm/d1'
import type { Logger } from 'drizzle-orm/logger'
import { createFactory } from 'hono/factory'

class DrizzleD1Logger implements Logger {
	logQuery(query: string, params: unknown[]): void {
		console.info({ query, params, msg: 'd1 sql executed' })
	}
}

type Env = {
	Variables: { db: DrizzleD1Database }
	Bindings: { DB: D1Database }
}

export const factory = createFactory<Env>({
	initApp: (app) => {
		app.use(async (ctx, next) => {
			const logger = new DrizzleD1Logger()
			ctx.set('db', drizzle(ctx.env.DB, { logger }))
			await next()
		})
	},
})
