import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { ViewerContent } from '~/application/component/viewer-content'
import { ViewerHeader } from '~/application/component/viewer-header'

// TODO: honoxのfile base routingにおけるoptional path parameterの表現が不明
// /viewer/narou/:ncode/:page? になってほしいが /viewer/narou/:ncode/:page になる
export const GET = createRoute(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.string().pipe(z.coerce.number().int().positive()).optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')

    return ctx.render(
      <div class="max-w:720px height:100dvh mx:auto flex flex-direction:column">
        <ViewerHeader ncode={ncode} />
        <ViewerContent ncode={ncode} page={page} />
      </div>,
    )
  },
)
