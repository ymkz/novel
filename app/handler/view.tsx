import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { ViewAction } from '~/component/view-action'
import { ViewContent } from '~/component/view-content'
import { getProxyNarouUrl } from '~/domain/narou'
import { factory } from '~/factory'

export const viewHandlers = factory.createHandlers(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.coerce.number().int().nonnegative().default(0),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')
    const proxyNarouUrl = getProxyNarouUrl(ncode, page)

    return ctx.render(
      <div id="view">
        <ViewContent src={proxyNarouUrl} />
        <ViewAction ncode={ncode} />
      </div>,
    )
  },
)
