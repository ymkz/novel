import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { ViewerContent } from '~/application/component/viewer-content'
import { ViewerHeader } from '~/application/component/viewer-header'

export const narouViewer = new Hono<AppEnv>().get(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.string().optional(),
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
