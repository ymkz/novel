import { Hono } from 'hono'
import { logger } from '~/handler/_logger'
import { renderer } from '~/handler/_renderer'
import { addHandlers } from '~/handler/add'
import { indexHandlers } from '~/handler/index'
import { proxyHandlers } from '~/handler/proxy'
import { removeHandlers } from '~/handler/remove'
import { viewHandlers } from '~/handler/view'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

app.use(logger)
app.use(renderer)

app.get('/', ...indexHandlers)
app.post('/', ...addHandlers)
app.post('/:ncode', ...removeHandlers)
app.get('/view/:ncode/:page?', ...viewHandlers)
app.get('/proxy/:ncode/:page?', ...proxyHandlers)

export default app
