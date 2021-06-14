import { Router } from 'itty-router'
import { proxy } from './controllers/proxy'
import { Env, WorkerRequest } from './types'
import { InternalWorkerError, NotFound } from './utils/response'

const router = Router()

router.get('/:ncode/:currentPage?', proxy)
router.all('*', NotFound)

export default {
  async fetch(req: WorkerRequest, env: Env, ctx: FetchEvent) {
    try {
      return await router.handle(req, env, ctx)
    } catch (error) {
      if (env.ENVIRONMENT === 'production') {
        ctx.waitUntil(console.log('SEND ERROR EVENT TO SENTRY'))
      }
      return InternalWorkerError(error.message)
    }
  },
}
