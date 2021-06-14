import { Env, WorkerRequest } from '../types'
import { updateOne } from '../utils/kv'
import { scrapeNovelContents } from '../utils/parse'

export const proxy = async (req: WorkerRequest, env: Env, ctx: FetchEvent) => {
  const userAgent = req.headers.get('user-agent') ?? ''
  const ncode = req.params?.ncode!
  const currentPage = req.params?.currentPage

  const updateTask = async () => {
    const [content] = await scrapeNovelContents(ncode)
    const novelInfo = { ...content, currentPage: Number(currentPage) ?? 0 }
    await updateOne(env.DB, novelInfo)
  }
  ctx.waitUntil(updateTask())

  return await fetch(
    `https://ncode.syosetu.com/${ncode}/${currentPage ?? ''}`,
    {
      headers: { 'user-agent': userAgent },
    }
  )
}
