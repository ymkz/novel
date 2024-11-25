import { createFactory } from 'hono/factory'
import { accessLogger } from './presenter/middleware/access-logger'

export type AppEnv = {
	Bindings: {
		DB: D1Database
	}
}

export const factory = createFactory<AppEnv>({
	initApp: (app) => {
		app.use(accessLogger())
	},
})
