import { toDisplayTime } from '../../utilities/app-date'
import { getAll } from '../../utilities/kv-repository'
import { fetchNarouApiResult } from '../../utilities/narou-api'

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  // TODO: 例外処理
  const current = await getAll(ctx.env.KV_NAROU_DATA)

  if (current.length === 0) {
    return new Response(JSON.stringify([]), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const ncodes = current.map((novel) => novel.ncode).join('-')

  // TODO: 例外処理
  const results = await fetchNarouApiResult(ncodes, ctx.request)

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
