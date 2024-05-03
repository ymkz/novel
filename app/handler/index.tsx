import { AddForm } from '~/component/add-form'
import { NovelList } from '~/component/novel-list'
import { factory } from '~/factory'
import * as narouUsecase from '~/usecase/narou'

export const indexHandlers = factory.createHandlers(async (ctx) => {
  const userAgent = ctx.req.header('user-agent')
  const narouNovelList = await narouUsecase.listNarouNovel(ctx.var.db, userAgent)

  return ctx.render(
    <div id="root">
      <AddForm />
      <NovelList narouNovelList={narouNovelList} />
    </div>,
  )
})
