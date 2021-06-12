import { DeleteBody, Env, PatchBody, PostBody } from './types'
import { addData, deleteData, getData, updateAll, updateData } from './utils/kv'
import { getContent } from './utils/parse'
import { BadRequest, NotFound, Ok, OkJson } from './utils/response'

async function handleRequest(req: Request, env: Env, ctx: FetchEvent) {
  const url = new URL(req.url)
  const contentType = req.headers.get('content-type') || ''

  if (req.method === 'GET' && url.pathname === '/api/get') {
    const data = await getData(env.DB)
    return OkJson(data)
  }

  if (req.method === 'POST' && url.pathname === '/api/add') {
    const { url }: PostBody = await req.json()
    const { hostname } = new URL(url)

    if (
      !contentType.includes('application/json') ||
      !hostname.includes('ncode.syosetu.com') ||
      !url
    ) {
      return BadRequest()
    }

    const { pathname } = new URL(url)
    const [, ncode, currentPage] = pathname.split('/')
    const [content] = await getContent(ncode)
    const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }
    await addData(env.DB, novelInfo)
    return Ok()
  }

  if (req.method === 'PATCH' && url.pathname === '/api/update') {
    const { url }: PatchBody = await req.json()

    if (!contentType.includes('application/json') || !url) {
      return BadRequest()
    }

    const { pathname } = new URL(url)
    const [, ncode, currentPage] = pathname.split('/')
    const [content] = await getContent(ncode)
    const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }
    await updateData(env.DB, ncode, novelInfo)

    return Ok()
  }

  if (req.method === 'PATCH' && url.pathname === '/api/updateAll') {
    const data = await getData(env.DB)
    const ncodes = data.map((item) => item.ncode).join('-')
    const contents = await getContent(ncodes)
    const novelData = data.map((item) => ({
      ...item,
      ...contents.find((content) => content.ncode === item.ncode),
    }))

    await updateAll(env.DB, novelData)

    return Ok()
  }

  if (req.method === 'DELETE' && url.pathname === '/api/delete') {
    const { ncode }: DeleteBody = await req.json()

    if (!contentType.includes('application/json') || !ncode) {
      return BadRequest()
    }

    await deleteData(env.DB, ncode)

    return Ok()
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
