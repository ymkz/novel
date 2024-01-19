import { Hono } from 'hono'
import { loggingMiddleware } from '~/application/middleware/logging'
import { narouAdd } from '~/presentation/handler/narou-add'
import { narouDelete } from '~/presentation/handler/narou-delete'
import { narouProxy } from '~/presentation/handler/narou-proxy'
import { indexPage } from '~/presentation/render/index'
import { narouViewer } from '~/presentation/render/narou'
import { renderer } from '~/presentation/render/renderer'

const app = new Hono<AppEnv>()

app.use('*', loggingMiddleware)

app.get('*', renderer)

app.route('/', indexPage)
app.route('/api/narou', narouAdd)
app.route('/api/narou/:ncode', narouDelete)
app.route('/proxy/narou/:ncode/:page?', narouProxy)
app.route('/viewer/narou/:ncode/:page?', narouViewer)

export default app
