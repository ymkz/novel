import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { update } from '~/application/usecase/narou'
import { parseNcodeAndPageFromUrlPath } from '~/domain/narou'
import { getOriginalNarouUrl, getProxyNarouUrl } from '~/domain/string'

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

export const narouProxy = new Hono<AppEnv>().get(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.string().pipe(z.coerce.number().int().positive()).optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')

    await update(ctx.env.D1, ncode, page ?? 0)

    const url = getOriginalNarouUrl(ncode, page)

    const proxiedResponse = await fetch(url, {
      headers: { 'user-agent': ctx.req.header('user-agent') ?? '' },
    })

    const response = new HTMLRewriter().on('a', narouLinkReplacer).transform(proxiedResponse)

    return response
  },
)
