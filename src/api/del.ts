import { Context } from 'hono'
import { removeOne } from '~/api/narou-kv'

export async function delNovel(ctx: Context<never>) {
  const { ncode } = await ctx.req.json().catch(() => {
    throw new Error('ErrRequestBodyParseFailure')
  })

  if (!ncode) {
    throw new Error('ErrRequestBodyNcodeMissing')
  }

  await removeOne(DB, ncode)

  return ctx.json({ msg: 'novel remove succeeded' })
}
