import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteNarouItem } from '../helpers/kv'
import { AppEnv } from '../models/env'
import { novelDeleteSchema } from '../models/novel'

const app = new Hono<AppEnv>()

export const novelDelete = app.delete(
  '/delete',
  zValidator('json', novelDeleteSchema),
  async (ctx) => {
    const { ncode } = ctx.req.valid('json')

    await deleteNarouItem(ctx.env.KV_NOVEL, ncode)

    return ctx.jsonT({ result: 'novel deleted' })
  }
)

export type NovelDeleteRoute = typeof novelDelete
