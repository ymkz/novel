import { removeOne } from '../../utilities/kv-repository'

type RequestBody = {
  ncode?: string
}

export const onRequestDelete: PagesFunction<Env> = async (ctx) => {
  const { ncode } = await ctx.request.json<RequestBody>().catch(() => {
    throw { reason: 'RequestBodyParseFailure', status: 400 }
  })

  if (!ncode) {
    throw { reason: 'RequestBodyNcodeMissing', status: 400 }
  }

  // TODO: 例外処理
  await removeOne(ctx.env.KV_NAROU_DATA, ncode)

  return new Response(JSON.stringify({ message: 'NovelDeleteSucceeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
