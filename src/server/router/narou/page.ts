import { Handler } from 'hono'
import { renderToStaticMarkup } from 'react-dom/server'
import { Reader } from '../../../client/components/reader'
import { updateNarouItem } from '../../repository/kv'

const replacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
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
}

const inserter = (node: string): HTMLRewriterElementContentHandlers => {
  return {
    element: (element) => {
      element.prepend(node, { html: true })
    },
  }
}

export const narouPageHandler: Handler<'ncode' | 'page?', Env> = async (
  ctx
) => {
  const { ncode, page } = ctx.req.param()

  await updateNarouItem(ctx.env.KV_NOVEL, {
    ncode,
    currentPage: Number(page) || 0,
  })

  const userAgent = ctx.req.header('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}/${page || ''}`

  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return new HTMLRewriter()
    .on('a', replacer)
    .on('body', inserter(renderToStaticMarkup(Reader(ncode))))
    .transform(proxied)
}
