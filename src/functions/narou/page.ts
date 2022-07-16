import { E } from '../../utils/error'
import { updateNarouItem } from '../../utils/narou/kv'

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

export const narouPage: PagesFunction<Env, NarouPageParams> = async (ctx) => {
  if (Array.isArray(ctx.params.ncode) || Array.isArray(ctx.params.page)) {
    throw E.RequestParamParseFailure
  }

  const ncode = ctx.params.ncode
  const page = ctx.params.page

  await updateNarouItem(ctx.env.KV_NOVEL_DATA, {
    ncode: ncode,
    currentPage: Number(page) || 0,
  })

  const userAgent = ctx.request.headers.get('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}/${Number(page) || ''}`

  // TODO: 例外処理（HTMLとしてレスポンスする必要がある）
  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return rewriter.transform(proxied)
}
