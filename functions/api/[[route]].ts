import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { AppEnv } from '../../src/models/env'
import { narouProxy } from '../../src/routes/narou-proxy'
import { novelAdd, NovelAddRoute } from '../../src/routes/novel-add'
import { novelDelete, NovelDeleteRoute } from '../../src/routes/novel-delete'
import { novelList, NovelListRoute } from '../../src/routes/novel-list'

const app = new Hono<AppEnv>()

app.route('/novel', novelList)
app.route('/novel', novelAdd)
app.route('/novel', novelDelete)
app.route('/narou', narouProxy)

export type AppType = NovelListRoute | NovelAddRoute | NovelDeleteRoute

export const onRequest = handle(app, '/api')
