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

export const narouIndex: PagesFunction<Env, NarouIndexParams> = async (ctx) => {
  if (Array.isArray(ctx.params.ncode)) {
    throw E.RequestParamParseFailure
  }

  const ncode = ctx.params.ncode

  await updateNarouItem(ctx.env.KV_NOVEL_DATA, {
    ncode: ncode,
    currentPage: 0,
  })

  const userAgent = ctx.request.headers.get('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}`

  // TODO: 例外処理（HTMLとしてレスポンスする必要がある）
  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return rewriter.transform(proxied)
}
