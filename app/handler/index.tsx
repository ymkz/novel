import { css } from 'hono/css'
import { NovelForm } from '~/component/novel-form'
import { NovelList } from '~/component/novel-list'
import { factory } from '~/handler/_factory'
import * as narouUsecase from '~/usecase/narou'

export const indexHandlers = factory.createHandlers(async (ctx) => {
  const userAgent = ctx.req.header('user-agent')
  const narouNovelList = await narouUsecase.listNarouNovel(ctx.env.DB, userAgent)

  const style = css`
    max-width: 720px;
    margin-inline: auto;
  `

  return ctx.render(
    <div id="root" class={style}>
      <NovelForm />
      <NovelList narouNovelList={narouNovelList} />
    </div>,
  )
})
