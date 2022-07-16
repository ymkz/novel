import { toDisplayTime } from '../../utils/date'
import { fetchNarouInfo } from '../../utils/narou/api'
import { getNarouData } from '../../utils/narou/kv'

export const apiGet: PagesFunction<Env> = async (ctx) => {
  const userAgent = ctx.request.headers.get('user-agent') ?? ''

  const current = await getNarouData(ctx.env.KV_NOVEL_DATA)

  if (current.length === 0) {
    return new Response(JSON.stringify([]), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const ncodes = current.map((novel) => novel.ncode).join('-')

  const results = await fetchNarouInfo(ncodes, userAgent)

  const novels = results.map<NovelForView>((result) => ({
    ...result,
    currentPage:
      current.find((currentItem) => currentItem.ncode === result.ncode)
        ?.currentPage ?? 0,
    lastPublishedAt: toDisplayTime(result.lastPublishedAt),
  }))

  return new Response(JSON.stringify(novels), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
