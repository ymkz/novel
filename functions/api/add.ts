import { addOne } from '../../utilities/kv-repository'

type RequestBody = {
  url?: string
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { url } = await ctx.request.json<RequestBody>().catch(() => {
    throw { reason: 'RequestBodyParseFailure', status: 400 }
  })

  if (!url) {
    throw { reason: 'RequestBodyUrlMissing', status: 400 }
  }

  // TODO: 例外処理
  const [, ncode, currentPage] = new URL(url).pathname.split('/')
  console.log(ncode, currentPage)

  // TODO: 例外処理
  await addOne(ctx.env.KV_NAROU_DATA, {
    ncode,
    currentPage: Number(currentPage) || 0,
  }).catch(() => {
    throw { reason: 'KVAddOneFailure', status: 500 }
  })

  return new Response(JSON.stringify({ message: 'NovelAddSucceeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
