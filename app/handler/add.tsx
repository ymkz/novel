import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { Message } from '~/component/message'
import { NovelForm } from '~/component/novel-form'
import { NovelList } from '~/component/novel-list'
import { factory } from '~/handler/_factory'
import * as narouUsecase from '~/usecase/narou'

export const addHandlers = factory.createHandlers(
  zValidator(
    'form',
    z.object({
      url: z.string().min(1).url(),
    }),
  ),
  async (ctx) => {
    const { url } = ctx.req.valid('form')
    const userAgent = ctx.req.header('user-agent')

    const result = await narouUsecase.addNarouNovel(ctx.env.DB, url)
    const narouNovelList = await narouUsecase.listNarouNovel(ctx.env.DB, userAgent)

    const message = `${result.type} ncode=${result.data.ncode} page=${result.data.page}`

    return ctx.html(
      <>
        <NovelForm />
        <Message message={message} />
        <NovelList narouNovelList={narouNovelList} />
      </>,
    )
  },
)
