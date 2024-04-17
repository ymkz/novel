import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getOriginalNarouUrl, getProxyNarouUrl, parseNcodeAndPage } from '~/domain/narou'
import { factory } from '~/handler/_factory'
import * as narouUsecase from '~/usecase/narou'

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const { ncode, page } = parseNcodeAndPage(attribute)
        element.setAttribute('href', attribute.replace(/^\/n.+/, getProxyNarouUrl(ncode, page)))
      }
    }
  },
}

export const proxyHandlers = factory.createHandlers(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.coerce.number().int().nonnegative().default(0),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')
    const userAgent = ctx.req.header('user-agent') ?? ''
    const url = getOriginalNarouUrl(ncode, page)

    const [proxiedResponse] = await Promise.all([
      fetch(url, { headers: { 'user-agent': userAgent } }),
      narouUsecase.updateNarouNovel(ctx.var.db, ncode, page),
    ])

    const response = new HTMLRewriter().on('a', narouLinkReplacer).transform(proxiedResponse)

    return response
  },
)
