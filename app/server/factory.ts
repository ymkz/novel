import { createFactory } from 'hono/factory'

export type AppEnv = {
	Bindings: {
		DB: D1Database
	}
}

export const factory = createFactory<AppEnv>()
