import { Env } from './types'
import { updateData } from './utils/kv'
import { getContent } from './utils/parse'
import { NotFound } from './utils/response'

async function handleRequest(req: Request, env: Env, ctx: FetchEvent) {
  const url = new URL(req.url)

  if (req.method === 'GET') {
    const USER_AGENT =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    const updateTask = async () => {
      const [, ncode, currentPage] = url.pathname.split('/')
      const [content] = await getContent(ncode)
      const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }
      await updateData(env.DB, ncode, novelInfo)
    }
    ctx.waitUntil(updateTask())
    return await fetch(`https://ncode.syosetu.com${url.pathname}`, {
      headers: { 'user-agent': USER_AGENT },
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
