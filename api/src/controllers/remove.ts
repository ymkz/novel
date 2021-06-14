import { DeleteBody, Env, WorkerRequest } from '../types'
import { removeOne } from '../utils/kv'
import { BadRequest, Ok } from '../utils/response'

export const remove = async (req: WorkerRequest, env: Env, ctx: FetchEvent) => {
  const contentType = req.headers.get('content-type') || ''
  const { ncode }: DeleteBody = await req.json()

  if (!contentType.includes('application/json') || !ncode) {
    return BadRequest()
  }

  await removeOne(env.DB, ncode)

  return Ok()
}
