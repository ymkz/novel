import { Hono } from 'hono'
import { toDisplayTime } from '../helpers/date'
import { getNarouData } from '../helpers/kv'
import { fetchNarouInfo } from '../helpers/narou-api'
import { AppEnv } from '../models/env'
import { NarouItem } from '../models/narou'

const app = new Hono<AppEnv>()

export const novelList = app.get('/list', async (ctx) => {
  const userAgent = ctx.req.header('user-agent') || ''

  const current = await getNarouData(ctx.env.KV_NOVEL)

  if (current.length === 0) {
    return ctx.jsonT<NarouItem[]>([])
  }

  const ncodeList = current.map((novel) => novel.ncode).join('-')

  const resultList = await fetchNarouInfo(ncodeList, userAgent)

  const novelList = resultList.map<NarouItem>((result) => ({
    ...result,
    currentPage:
      current.find((currentItem) => currentItem.ncode === result.ncode)
        ?.currentPage ?? 0,
    lastPublishedAt: toDisplayTime(result.lastPublishedAt),
  }))

  return ctx.jsonT<NarouItem[]>(novelList)
})

export type NovelListRoute = typeof novelList
