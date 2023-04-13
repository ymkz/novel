import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { narouProxy } from '../../src/server/routes/narou-proxy'
import { novelAdd } from '../../src/server/routes/novel-add'
import { novelDelete } from '../../src/server/routes/novel-delete'
import { novelList } from '../../src/server/routes/novel-list'

const app = new Hono<AppEnv>().basePath('/api')

app.route('/novel', novelList)
app.route('/novel', novelAdd)
app.route('/novel', novelDelete)
app.route('/narou', narouProxy)

app.onError((err, ctx) => {
  console.error(err)
  return ctx.text(err.message, 500)
})

export const onRequest = handle(app)
