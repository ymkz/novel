import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { AddForm } from '~/component/add-form'
import { Message } from '~/component/message'
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

    const addResult = await narouUsecase.addNarouNovel(ctx.env.DB, url)
    const narouNovelList = await narouUsecase.listNarouNovel(ctx.env.DB, userAgent)

    return ctx.html(
      <>
        <AddForm />
        <Message message={addResult} />
        <NovelList narouNovelList={narouNovelList} />
      </>,
    )
  },
)
