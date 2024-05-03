import { secureHeaders } from 'hono/secure-headers'
import { factory } from '~/factory'
import { addHandlers } from '~/handler/add'
import { listHandlers } from '~/handler/list'
import { accessLogger } from '~/handler/middleware/logger'
import { renderer } from '~/handler/middleware/renderer'
import { proxyHandlers } from '~/handler/proxy'
import { removeHandlers } from '~/handler/remove'
import { viewHandlers } from '~/handler/view'

const app = factory.createApp()

app.use(secureHeaders())
app.use(accessLogger())
app.use(renderer())

app.get('/', ...listHandlers)
app.post('/', ...addHandlers)
app.post('/:ncode', ...removeHandlers)
app.get('/view/:ncode/:page?', ...viewHandlers)
app.get('/proxy/:ncode/:page?', ...proxyHandlers)

export default app
