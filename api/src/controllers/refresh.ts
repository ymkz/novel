import { Env, WorkerRequest } from '../types'
import { getAll, updateAll } from '../utils/kv'
import { scrapeNovelContents } from '../utils/parse'
import { Ok } from '../utils/response'

export const refresh = async (
  req: WorkerRequest,
  env: Env,
  ctx: FetchEvent
) => {
  const data = await getAll(env.DB)
  const ncodes = data.map((item) => item.ncode).join('-')
  const contents = await scrapeNovelContents(ncodes)
  const novelData = data.map((item) => ({
    ...item,
    ...contents.find((content) => content.ncode === item.ncode),
  }))

  await updateAll(env.DB, novelData)

  return Ok()
}
