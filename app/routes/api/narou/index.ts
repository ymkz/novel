import { zValidator } from '@hono/zod-validator'
import { createRoute } from 'honox/factory'
import { z } from 'zod'

export const POST = createRoute(
  zValidator(
    'form',
    z.object({
      url: z.string().min(1).url(),
    }),
  ),
  async (ctx) => {
    const { url } = ctx.req.valid('form')
    return ctx.json({ add: true })

    // const message = await add(ctx.env.D1, url)
    // const novels = await list(ctx.env.D1, ctx.req.header('user-agent'))

    // return ctx.html(
    //   <>
    //     <NovelForm />
    //     <Message message={message} />
    //     <NovelList narouNovelList={novels} />
    //   </>,
    // )
  },
)
