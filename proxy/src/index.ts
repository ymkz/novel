import { Env } from './types'
import { updateData } from './utils/kv'
import { getContent } from './utils/parse'
import { NotFound } from './utils/response'

async function handleRequest(req: Request, env: Env, ctx: FetchEvent) {
  const url = new URL(req.url)
  const userAgent = req.headers.get('user-agent') ?? ''

  if (req.method === 'GET' && url.pathname.startsWith('/n')) {
    const updateTask = async () => {
      const [, ncode, currentPage] = url.pathname.split('/')
      const [content] = await getContent(ncode)
      const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }
      await updateData(env.DB, ncode, novelInfo)
    }
    ctx.waitUntil(updateTask())
    return await fetch(`https://ncode.syosetu.com${url.pathname}`, {
      headers: { 'user-agent': userAgent },
    })
  }

  return NotFound()
}

export default {
  async fetch(req: Request, env: Env, ctx: FetchEvent) {
    try {
      return await handleRequest(req, env, ctx)
    } catch (error) {
      if (env.ENVIRONMENT === 'production') {
        ctx.waitUntil(console.log('SEND ERROR EVENT TO SENTRY'))
      }
      return new Response(error.message)
    }
  },
}
