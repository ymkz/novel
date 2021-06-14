import { Env, PatchBody, WorkerRequest } from '../types'
import { updateOne } from '../utils/kv'
import { scrapeNovelContents } from '../utils/parse'
import { BadRequest, Ok } from '../utils/response'

export const update = async (req: WorkerRequest, env: Env, ctx: FetchEvent) => {
  const contentType = req.headers.get('content-type') || ''
  const { url }: PatchBody = await req.json()

  if (!contentType.includes('application/json') || !url) {
    return BadRequest()
  }

  const { pathname } = new URL(url)
  const [, ncode, currentPage] = pathname.split('/')
  const [content] = await scrapeNovelContents(ncode)
  const novelInfo = { ...content, currentPage: Number(currentPage) || 0 }

  await updateOne(env.DB, novelInfo)

  return Ok()
}
