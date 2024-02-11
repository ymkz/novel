import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'

export const DELETE = createRoute(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid('param')
    return ctx.json({ remove: true })

    // await remove(ctx.env.D1, ncode)

    // return ctx.body(null, {
    //   status: 204,
    //   headers: { 'HX-Location': '/' },
    // })
  },
)
