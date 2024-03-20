import { zValidator } from '@hono/zod-validator'
import { css } from 'hono/css'
import { z } from 'zod'
import { ViewerContent } from '~/component/viewer-content'
import { ViewerHeader } from '~/component/viewer-header'
import { getProxyNarouUrl } from '~/domain/narou'
import { factory } from '~/handler/_factory'

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

    const style = css`
      max-width: 720px;
      height: 100dvh;
      margin-inline: auto;
      display: flex;
      flex-direction: column;
    `

    return ctx.render(
      <div class={style}>
        <ViewerHeader ncode={ncode} />
        <ViewerContent src={proxyNarouUrl} />
      </div>,
    )
  },
)
