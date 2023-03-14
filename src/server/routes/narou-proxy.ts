import { Hono } from 'hono'
import { updateNovelItem } from '../helpers/kv'

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split('/')
        element.setAttribute(
          'href',
          attribute.replace(/^\/n.+/, `/api/narou/${ncode}/${page}`)
        )
      }
    }
  },
}

const app = new Hono<AppEnv>()

export const narouProxy = app.get('/:ncode/:page?', async (ctx) => {
  const { ncode, page } = ctx.req.param()

  await updateNovelItem(ctx.env.KV_NOVEL, {
    ncode,
    currentPage: Number(page) || 0,
  })

  const userAgent = ctx.req.header('user-agent') ?? ''
  const url = page
    ? `https://ncode.syosetu.com/${ncode}/${page}`
    : `https://ncode.syosetu.com/${ncode}`

  const proxiedResponse = await fetch(url, {
    headers: { 'user-agent': userAgent },
  })

  return new HTMLRewriter()
    .on('a', narouLinkReplacer)
    .transform(proxiedResponse)
})
