import { factory } from '../factory'

export const healthCheckHandlers = factory.createHandlers((ctx) => {
	return ctx.json({ status: 'UP' }, 200)
})
