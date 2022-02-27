import { Context } from 'hono'
import { addOne } from '~/api/narou-kv'

export async function addNovel(ctx: Context<never>) {
  const { url } = await ctx.req.json().catch(() => {
    throw new Error('ErrRequestBodyParseFailure')
  })

  if (!url) {
    throw new Error('ErrRequestBodyUrlMissing')
  }

  const [, ncode, currentPage] = new URL(url).pathname.split('/')

  await addOne(DB, { ncode, currentPage: Number(currentPage) || 0 })

  return ctx.json({ msg: 'novel add succeeded' })
}
