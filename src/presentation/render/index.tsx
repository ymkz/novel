import { Hono } from 'hono'
import { NovelForm } from '~/application/component/novel-form'
import { NovelList } from '~/application/component/novel-list'
import { list } from '~/application/usecase/narou'

export const indexPage = new Hono<AppEnv>().get(async (ctx) => {
  const narouNovelList = await list(ctx.env.D1, ctx.req.header('user-agent') ?? '')

  return ctx.render(
    <div id="root" class="max-w:720px mx:auto">
      <NovelForm />
      <NovelList narouNovelList={narouNovelList} />
    </div>,
  )
})
