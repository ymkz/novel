import { E } from '../../utils/error'
import { deleteNarouItem } from '../../utils/narou/kv'

export const apiDel: PagesFunction<Env> = async (ctx) => {
  const { ncode } = await ctx.request.json<ApiDelRequestBody>().catch(() => {
    throw E.RequestBodyParseFailure
  })

  if (!ncode) {
    throw E.RequestBodyNcodeMissing
  }

  await deleteNarouItem(ctx.env.KV_NOVEL_DATA, ncode)

  return new Response(JSON.stringify({ message: 'novel delete succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
