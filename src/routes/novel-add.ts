import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { addNarouItem } from '../helpers/kv'
import { AppEnv } from '../models/env'
import { novelAddSchema } from '../models/novel'

const app = new Hono<AppEnv>()

export const novelAdd = app.post(
  '/add',
  zValidator('json', novelAddSchema),
  async (ctx) => {
    const { url } = ctx.req.valid('json')

    const [, ncode, currentPage] = new URL(url).pathname.split('/')

    await addNarouItem(ctx.env.KV_NOVEL, {
      ncode,
      currentPage: Number(currentPage) || 0,
    })

    return ctx.jsonT({ result: 'novel added' })
  }
)

export type NovelAddRoute = typeof novelAdd
