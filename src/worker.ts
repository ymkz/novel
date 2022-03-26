import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { addNovel } from '~/api/add'
import { delNovel } from '~/api/del'
import { getNovels } from '~/api/get'
import { fetchNarouIndex } from '~/api/ncode'
import { fetchNarouPage } from '~/api/page'

const app = new Hono()

app.use('*', serveStatic())

app.get('/narou/:ncode/', fetchNarouIndex)
app.get('/narou/:ncode/:page', fetchNarouPage)
app.get('/api/get', getNovels)
app.post('/api/add', addNovel)
app.delete('/api/del', delNovel)

app.onError((err = Error('UnexpectedError'), ctx) => {
  console.error({ err: { reason: err.message } })
  return ctx.json({ err: { reason: err.message } }, 500)
})

app.fire()
