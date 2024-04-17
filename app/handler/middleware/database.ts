import { drizzle } from 'drizzle-orm/d1'
import type { Logger } from 'drizzle-orm/logger'
import { factory } from '~/handler/_factory'

class DrizzleD1Logger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.info({ query, params, msg: 'd1 sql executed' })
  }
}

export const database = () => {
  return factory.createMiddleware(async (ctx, next) => {
    const logger = new DrizzleD1Logger()
    ctx.set('db', drizzle(ctx.env.DB, { logger }))
    await next()
  })
}
