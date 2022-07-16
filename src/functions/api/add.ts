import { E } from '../../utils/error'
import { addNarouItem } from '../../utils/narou/kv'

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    return parsed.protocol.startsWith('http')
  } catch (e) {
    return false
  }
}

export const apiAdd: PagesFunction<Env> = async (ctx) => {
  const { url } = await ctx.request.json<ApiAddRequestBody>().catch(() => {
    throw E.RequestBodyParseFailure
  })

  if (!url) {
    throw E.RequestBodyUrlMissing
  }

  if (!isValidUrl(url)) {
    throw E.InvalidHttpUrl
  }

  const [, ncode, currentPage] = new URL(url).pathname.split('/')

  await addNarouItem(ctx.env.KV_NOVEL_DATA, {
    ncode,
    currentPage: Number(currentPage) || 0,
  })

  return new Response(JSON.stringify({ message: 'novel add succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
