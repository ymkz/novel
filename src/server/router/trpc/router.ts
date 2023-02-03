import { initTRPC } from '@trpc/server'
import { novelAddSchema } from '../../../schema/novel'
import { toDisplayTime } from '../../../util/date'
import { addNarouItem, getNarouData } from '../../repository/kv'
import { fetchNarouInfo } from '../../repository/narou-api'
import { TrpcContext } from './context'

const t = initTRPC.context<TrpcContext>().create()

const router = t.router
const publicProcedure = t.procedure

const novelRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const userAgent = ctx.req.header('user-agent')

    const current = await getNarouData(ctx.env.KV_NOVEL)

    if (current.length === 0) {
      return { novels: [] }
    }

    const ncodes = current.map((novel) => novel.ncode).join('-')

    const results = await fetchNarouInfo(ncodes, userAgent)

    const novels = results.map<NarouItem>((result) => ({
      ...result,
      currentPage:
        current.find((currentItem) => currentItem.ncode === result.ncode)
          ?.currentPage ?? 0,
      lastPublishedAt: toDisplayTime(result.lastPublishedAt),
    }))

    return { novels }
  }),
  add: publicProcedure
    .input(novelAddSchema)
    .mutation(async ({ ctx, input }) => {
      const [, ncode, currentPage] = new URL(input.url).pathname.split('/')

      await addNarouItem(ctx.env.KV_NOVEL, {
        ncode,
        currentPage: Number(currentPage) || 0,
      })

      return { ok: true }
    }),
})

export const appRouter = router({
  novel: novelRouter,
})

export type AppRouter = typeof appRouter
