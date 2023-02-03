import { Handler } from 'hono'
import { deleteNarouItem } from '../../repository/kv'

export const narouDeleteHandler: Handler<'ncode', Env> = async (ctx) => {
  const { ncode } = ctx.req.param()

  await deleteNarouItem(ctx.env.KV_NOVEL, ncode)

  return ctx.redirect('/')
}
