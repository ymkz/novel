import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { deleteNarouNovel } from '~/application/usecase/narou'

export const narouDelete = new Hono<AppEnv>().post(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid('param')

    await deleteNarouNovel(ctx.env.KV, ncode)

    return ctx.body(null, {
      status: 204,
      headers: { 'HX-Location': '/' },
    })
  },
)
