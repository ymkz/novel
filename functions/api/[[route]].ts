import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { narouProxy } from '../../src/server/routes/narou-proxy'
import { novelAdd } from '../../src/server/routes/novel-add'
import { novelDelete } from '../../src/server/routes/novel-delete'
import { novelList } from '../../src/server/routes/novel-list'

const app = new Hono<AppEnv>()

app.route('/novel', novelList)
app.route('/novel', novelAdd)
app.route('/novel', novelDelete)
app.route('/narou', narouProxy)

export const onRequest = handle(app, '/api')
