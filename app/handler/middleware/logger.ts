import { createMiddleware } from 'hono/factory'

const duration = (start: number) => {
  const delta = performance.now() - start
  return Number.parseFloat(delta.toFixed(6)) // 小数点第6位まで四捨五入して丸める
}

export const accessLogger = () => {
  return createMiddleware(async (ctx, next) => {
    const start = performance.now()

    const requestInfo = { url: ctx.req.url, method: ctx.req.method }
    console.info({ access: { ...requestInfo }, msg: 'request incoming' })
    await next()
    const responseInfo = { status: ctx.res.status, durationMs: duration(start) }
    console.info({ access: { ...requestInfo, ...responseInfo }, msg: 'request completed' })
  })
}
