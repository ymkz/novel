import { createRoute } from 'honox/factory'

export default createRoute(async (ctx, next) => {
  const url = ctx.req.url
  const method = ctx.req.method

  console.info(`request incoming : method=${method} url=${url}`)
  await next()
  console.info(`request completed : method=${method} url=${url} status=${ctx.res.status}`)
})
