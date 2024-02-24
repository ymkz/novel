import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { ViewerContent } from '~/components/viewer-content'
import { ViewerHeader } from '~/components/viewer-header'
import { getProxyNarouUrl } from '~/domains/narou'

export const GET = createRoute(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.string().pipe(z.coerce.number().int().nonnegative()),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')
    const proxyNarouUrl = getProxyNarouUrl(ncode, page)

    return ctx.render(
      <div class="max-w:720px height:100dvh mx:auto flex flex-direction:column">
        <ViewerHeader ncode={ncode} />
        <ViewerContent src={proxyNarouUrl} />
      </div>,
    )
  },
)
