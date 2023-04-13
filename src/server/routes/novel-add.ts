import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { addNovelItem } from '../helpers/kv'
import { novelAddSchema } from '../schemas/novel'

export const novelAdd = new Hono<AppEnv>().post(
  '/add',
  zValidator('json', novelAddSchema),
  async (ctx) => {
    const { url } = ctx.req.valid('json')

    const [, ncode, currentPage] = new URL(url).pathname.split('/')

    await addNovelItem(ctx.env.KV_NOVEL, {
      ncode,
      currentPage: Number(currentPage) || 0,
    })

    return ctx.jsonT({ result: 'novel added' })
  }
)

export type NovelAddRoute = typeof novelAdd
