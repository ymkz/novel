import { secureHeaders } from 'hono/secure-headers'
import { factory } from './factory'
import { errorHandler } from './presenter/_error'
import { notFoundHandler } from './presenter/_notfound'
import { defaultHtmlHandlers } from './presenter/default-html'
import { healthCheckHandlers } from './presenter/health-check'
import { narouProxyHandlers } from './presenter/narou-proxy'
import { novelAddHandlers } from './presenter/novels/add'
import { novelListHandlers } from './presenter/novels/list'
import { novelRemoveHandlers } from './presenter/novels/remove'

const app = factory.createApp()

app.use(secureHeaders())

const novelsApi = app
	.get('/novels', ...novelListHandlers)
	.post('/novels', ...novelAddHandlers)
	.delete('/novels/:ncode', ...novelRemoveHandlers)

app.get('/narou/:ncode/:page?', ...narouProxyHandlers)

app.get('/healthz', ...healthCheckHandlers)
app.get('*', ...defaultHtmlHandlers)

app.notFound(notFoundHandler)
app.onError(errorHandler)

export type NovelsApi = typeof novelsApi

export { app }
