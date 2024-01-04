import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { NovelList } from '~/application/component/novel-list'
import { addNarouNovel, getNarouNovelList } from '~/application/usecase/narou'

export const narouAdd = new Hono<AppEnv>().post(
  zValidator(
    'form',
    z.object({
      url: z.string().min(1).url(),
    }),
  ),
  async (ctx) => {
    const { url } = ctx.req.valid('form')

    await addNarouNovel(ctx.env.KV, url)

    const narouNovelList = await getNarouNovelList(ctx.env.KV, ctx.req.header('user-agent') ?? '')

    return ctx.html(<NovelList narouNovelList={narouNovelList} />)
  },
)
