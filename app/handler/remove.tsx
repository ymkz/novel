import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { factory } from '~/handler/_factory'
import * as narouUsecase from '~/usecase/narou'

export const removeHandlers = factory.createHandlers(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid('param')

    await narouUsecase.removeNarouNovel(ctx.env.DB, ncode)

    return ctx.body(null, { status: 204, headers: { 'HX-Location': '/' } })
  },
)
