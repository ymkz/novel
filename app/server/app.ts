import { factory } from './factory'
import { healthCheckHandlers } from './presenter/controller/health-check'
import { htmlRendererHandlers } from './presenter/controller/html-renderer'
import { narouProxyHandlers } from './presenter/controller/narou-proxy'
import { novelAddHandlers } from './presenter/controller/novel-add'
import { novelGetHandlers } from './presenter/controller/novel-get'
import { novelListHandlers } from './presenter/controller/novel-list'
import { novelRemoveHandlers } from './presenter/controller/novel-remove'
import { errorHandler } from './presenter/handler/error'
import { notFoundHandler } from './presenter/handler/notfound'

const app = factory.createApp()

const novelsApi = app
	.get('/api/novels', ...novelListHandlers)
	.post('/api/novels', ...novelAddHandlers)
	.get('/api/novels/:ncode', ...novelGetHandlers)
	.delete('/api/novels/:ncode', ...novelRemoveHandlers)

app.get('/proxy/narou/:ncode/:page?', ...narouProxyHandlers)

app.get('/healthz', ...healthCheckHandlers)
app.get('*', ...htmlRendererHandlers)

app.notFound(notFoundHandler)
app.onError(errorHandler)

export type NovelsApi = typeof novelsApi

export { app }
