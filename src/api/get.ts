import dayjs from 'dayjs'
import { Context } from 'hono'
import { fetchNarouApiResult } from '~/api/narou-api'
import { getAll } from '~/api/narou-kv'

export async function getNovels(ctx: Context<never>) {
  const current = await getAll(DB)
  const ncodes = current.map((novel) => novel.ncode).join('-')
  const results = await fetchNarouApiResult(ncodes, ctx)
  const novels = results.map<NovelForView>((result) => ({
    ...result,
    currentPage:
      current.find((currentItem) => currentItem.ncode === result.ncode)
        ?.currentPage ?? 0,
    lastPublishedAt: dayjs
      .unix(result.lastPublishedAt)
      .format('YYYY年M月D日H時m分'),
  }))
  return ctx.json(novels)
}
