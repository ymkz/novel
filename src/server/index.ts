import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { FetchError, KVError } from './helper/error'
import { narouDeleteHandler } from './router/narou/delete'
import { narouPageHandler } from './router/narou/page'
import { trpcHandler } from './router/trpc'

const app = new Hono<Env>()

app.all('/trpc/*', trpcHandler)

app.get('/narou/:ncode/delete', narouDeleteHandler)
app.get('/narou/:ncode/:page?', narouPageHandler)

app.get('*', serveStatic())

app.onError((err, ctx) => {
  console.error(err)

  if (err instanceof KVError || err instanceof FetchError) {
    return ctx.json({ error: err.message }, 500)
  }

  return ctx.json({ error: 'an unexpected error occurred' }, 500)
})

export default app
