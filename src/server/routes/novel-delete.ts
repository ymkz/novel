import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteNovelItem } from '../helpers/kv'
import { novelDeleteSchema } from '../schemas/novel'

export const novelDelete = new Hono<AppEnv>().delete(
  '/delete',
  zValidator('json', novelDeleteSchema),
  async (ctx) => {
    const { ncode } = ctx.req.valid('json')

    await deleteNovelItem(ctx.env.KV_NOVEL, ncode)

    return ctx.jsonT({ result: 'novel deleted' })
  }
)

export type NovelDeleteRoute = typeof novelDelete
