import { Router } from 'itty-router'
import { add } from './controllers/add'
import { get } from './controllers/get'
import { refresh } from './controllers/refresh'
import { remove } from './controllers/remove'
import { update } from './controllers/update'
import { Env } from './types'
import { InternalWorkerError, NotFound } from './utils/response'

const router = Router({ base: '/api' })

router.get('/get', get)
router.post('/add', add)
router.delete('/remove', remove)
router.patch('/update', update)
router.patch('/refresh', refresh)
router.all('*', NotFound)

export default {
  async fetch(req: Request, env: Env, ctx: FetchEvent) {
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
