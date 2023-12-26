import { Hono } from 'hono'
import { narouAdd } from '~/presentation/handler/narou-add'
import { narouDelete } from '~/presentation/handler/narou-delete'
import { narouProxy } from '~/presentation/handler/narou-proxy'
import { indexPage } from '~/presentation/render/index'
import { narouViewer } from '~/presentation/render/narou'
import { renderer } from '~/presentation/render/renderer'
import { loggingMiddleware } from './domain/logging'

const app = new Hono()

app.use('*', loggingMiddleware)

app.get('*', renderer)

app.route('/', indexPage)
app.route('/api/narou', narouAdd)
app.route('/api/narou', narouDelete)
app.route('/proxy/narou/:ncode/:page?', narouProxy)
app.route('/viewer/narou/:ncode/:page?', narouViewer)

export default app
