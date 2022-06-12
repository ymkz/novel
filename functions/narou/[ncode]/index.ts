import { updateOne } from '../../../utilities/kv-repository'

type Params = 'ncode'

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

export const onRequestGet: PagesFunction<Env, Params> = async (ctx) => {
  if (Array.isArray(ctx.params.ncode)) {
    throw { reason: 'RequestParamParseFailure', status: 400 }
  }

  const ncode = ctx.params.ncode

  await updateOne(ctx.env.KV_NAROU_DATA, {
    ncode: ncode,
    currentPage: 0,
  }).catch(() => {
    throw { reason: 'KVUpdateOneFailure', status: 500 }
  })

  const userAgent = ctx.request.headers.get('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}`
  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return rewriter.transform(proxied)
}
