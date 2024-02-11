import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'

import {
  getOriginalNarouUrl,
  getProxyNarouUrl,
  parseNcodeAndPageFromUrlPath,
} from '~/domains/narou'

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const { ncode, page } = parseNcodeAndPageFromUrlPath(attribute)
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
      page: z.string().pipe(z.coerce.number().int().positive()).optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')

    // await update(ctx.env.D1, ncode, page ?? 0)

    const url = getOriginalNarouUrl(ncode, page)

    const proxiedResponse = await fetch(url, {
      headers: { 'user-agent': ctx.req.header('user-agent') ?? '' },
    })

    const response = new HTMLRewriter().on('a', narouLinkReplacer).transform(proxiedResponse)

    return response
  },
)
