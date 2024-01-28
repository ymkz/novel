import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { Message } from '~/application/component/message'
import { NovelForm } from '~/application/component/novel-form'
import { NovelList } from '~/application/component/novel-list'
import { add, list } from '~/application/usecase/narou'

export const narouAdd = new Hono<AppEnv>().post(
  zValidator(
    'form',
    z.object({
      url: z.string().min(1).url(),
    }),
  ),
  async (ctx) => {
    const { url } = ctx.req.valid('form')

    const message = await add(ctx.env.D1, url)
    const novels = await list(ctx.env.D1, ctx.req.header('user-agent'))

    return ctx.html(
      <>
        <NovelForm />
        <Message message={message} />
        <NovelList narouNovelList={novels} />
      </>,
    )
  },
)
