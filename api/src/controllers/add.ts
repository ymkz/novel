import { Env, PostBody, WorkerRequest } from '../types'
import { addOne } from '../utils/kv'
import { scrapeNovelContents } from '../utils/parse'
import { BadRequest, Ok } from '../utils/response'

export const add = async (req: WorkerRequest, env: Env, ctx: FetchEvent) => {
  const contentType = req.headers.get('content-type') || ''

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
  const [content] = await scrapeNovelContents(ncode)
  const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }

  await addOne(env.DB, novelInfo)

  return Ok()
}
