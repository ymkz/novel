import { Context } from 'hono'
import { updateOne } from '~/api/narou-kv'

const rewriter = new HTMLRewriter().on('a', {
  element(element) {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split('/')
        element.setAttribute(
          'href',
          attribute.replace(/^\/n.+/, `/narou/${ncode}/${page}`)
        )
      }
    }
  },
})

export async function fetchNarouIndex(ctx: Context<'ncode'>) {
  const ncode = ctx.req.param('ncode')

  await updateOne(DB, {
    ncode: ncode,
    currentPage: 0,
  })

  const userAgent = ctx.req.headers.get('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}`
  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return rewriter.transform(proxied)
}