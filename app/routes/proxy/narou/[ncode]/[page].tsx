import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { parseNcodeAndPageFromUrl } from '~/domains/narou'
import { getOriginalNarouUrl, getProxyNarouUrl } from '~/domains/narou'
import { update } from '~/usecases/narou'

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const { ncode, page } = parseNcodeAndPageFromUrl(attribute)
        element.setAttribute('href', attribute.replace(/^\/n.+/, getProxyNarouUrl(ncode, page)))
      }
    }
  },
}

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
    const url = getOriginalNarouUrl(ncode, page)

    const [proxiedResponse] = await Promise.all([
      fetch(url, { headers: { 'user-agent': ctx.req.header('user-agent') ?? '' } }),
      update(ctx.env.D1, ncode, page ?? 0),
    ])

    return new HTMLRewriter().on('a', narouLinkReplacer).transform(proxiedResponse)
  },
)
