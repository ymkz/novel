import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import { addHandlers } from '~/handler/add'
import { indexHandlers } from '~/handler/index'
import { accessLogger } from '~/handler/middleware/logger'
import { renderer } from '~/handler/middleware/renderer'
import { proxyHandlers } from '~/handler/proxy'
import { removeHandlers } from '~/handler/remove'
import { viewHandlers } from '~/handler/view'

type Env = {
  Bindings: { DB: D1Database }
}

const app = new Hono<Env>()

app.use(renderer())
app.use(accessLogger())
app.use(secureHeaders())

app.get('/', ...indexHandlers)
app.post('/', ...addHandlers)
app.post('/:ncode', ...removeHandlers)
app.get('/view/:ncode/:page?', ...viewHandlers)
app.get('/proxy/:ncode/:page?', ...proxyHandlers)

export default app
