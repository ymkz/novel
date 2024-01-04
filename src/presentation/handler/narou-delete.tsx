import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { deleteNovelOne } from '~/infrastructure/kv'

export const narouDelete = new Hono<AppEnv>().delete(
  zValidator(
    'form',
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid('form')

    await deleteNovelOne(ctx.env.KV, ncode)

    return ctx.body(null, {
      status: 204,
      headers: { 'HX-Location': '/' },
    })
  },
)
