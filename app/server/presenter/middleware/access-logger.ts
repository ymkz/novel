import { factory } from '../../factory'

const duration = (start: number) => {
	const delta = performance.now() - start
	return Number.parseFloat(delta.toFixed(6)) // 小数点第6位まで四捨五入して丸める
}

const IGNORE_PATH = /^\/(favicon|health)/

export const accessLogger = () => {
	return factory.createMiddleware(async (ctx, next) => {
		if (IGNORE_PATH.test(ctx.req.path)) return await next()

		const start = performance.now()

		const requestInfo = { url: ctx.req.url, method: ctx.req.method }
		console.info({ access: { ...requestInfo }, msg: 'request incoming' })

		await next()

		const responseInfo = { status: ctx.res.status, durationMs: duration(start) }
		console.info({ access: { ...requestInfo, ...responseInfo }, msg: 'request completed' })
	})
}
