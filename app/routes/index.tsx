import { createRoute } from 'honox/factory'
import { NovelForm } from '~/components/novel-form'
import { NovelList } from '~/components/novel-list'
import { list } from '~/usecases/narou'

export const GET = createRoute(async (ctx) => {
  const narouNovelList = await list(ctx.env.D1, ctx.req.header('user-agent'))

  return ctx.render(
    <div id="root" class="max-w:720px mx:auto">
      <NovelForm />
      <NovelList narouNovelList={narouNovelList} />
    </div>,
  )
})
