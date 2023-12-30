import { Hono } from 'hono'
import { NovelForm } from '~/application/component/novel-form'
import { NovelList } from '~/application/component/novel-list'
import { getNarouNovelList } from '~/application/service/narou'

export const indexPage = new Hono<AppEnv>().get(async (ctx) => {
  const narouNovelList = await getNarouNovelList(ctx.env.KV, ctx.req.header('user-agent') ?? '')

  return ctx.render(
    <div class="max-w:720px mx:auto">
      <header class="p:16px pr:8px">
        <NovelForm />
      </header>
      <main class="px:16px pt:8px pb:32px">
        <NovelList narouNovelList={narouNovelList} />
      </main>
    </div>,
  )
})
