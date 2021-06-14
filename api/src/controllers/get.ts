import { Env, WorkerRequest } from '../types'
import { getAll } from '../utils/kv'
import { OkJson } from '../utils/response'

export const get = async (req: WorkerRequest, env: Env, ctx: FetchEvent) => {
  const data = await getAll(env.DB)
  data.sort((x, y) => y.updatedAt - x.updatedAt)
  return OkJson(data)
}
