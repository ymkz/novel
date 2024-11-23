import type { ErrorHandler } from 'hono'

export const errorHandler: ErrorHandler = (err, ctx) => {
	console.error(err, 'unexpected error has occurred')

	return ctx.json(
		{
			title: 'Internal Server Error',
			type: 'DEFAULT',
			detail: 'unexpected error has occurred',
			status: 500,
		},
		500,
	)
}
