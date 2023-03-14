import { Hono } from 'hono'
import { toDisplayTime } from '../helpers/date'
import { getNovelData } from '../helpers/kv'
import { fetchNarouInfoFromNarouApi } from '../helpers/narou'

export const novelList = new Hono<AppEnv>().get('/list', async (ctx) => {
  const userAgent = ctx.req.header('user-agent') || ''

  const kvNovelList = await getNovelData(ctx.env.KV_NOVEL)

  if (kvNovelList.length === 0) {
    return ctx.jsonT<Novel[]>([])
  }

  const ncodeList = kvNovelList.map((novel) => novel.ncode).join('-')

  const narouInfoList = await fetchNarouInfoFromNarouApi(ncodeList, userAgent)

  const novelList = narouInfoList.map<Novel>((narouInfo) => ({
    ...narouInfo,
    currentPage:
      kvNovelList.find((kvNovelItem) => kvNovelItem.ncode === narouInfo.ncode)
        ?.currentPage ?? 0,
    lastPublishedAt: toDisplayTime(narouInfo.lastPublishedAt),
  }))

  return ctx.jsonT<Novel[]>(novelList)
})

export type NovelListRoute = typeof novelList
