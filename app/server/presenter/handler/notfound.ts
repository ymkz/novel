import type { NotFoundHandler } from 'hono'

export const notFoundHandler: NotFoundHandler = (ctx) => {
	console.warn(`requested unknown resource: method=${ctx.req.method} url=${ctx.req.url}`)

	return ctx.json(
		{
			title: 'Not Found',
			type: 'DEFAULT',
			detail: 'requested resource not found',
			status: 404,
		},
		404,
	)
}
