import { hc } from 'hono/client'
import { NovelAddRoute } from '../../server/routes/novel-add'
import { NovelDeleteRoute } from '../../server/routes/novel-delete'
import { NovelListRoute } from '../../server/routes/novel-list'
import { NovelAddInput, NovelDeleteInput } from '../../server/schemas/novel'

const client = hc<NovelListRoute | NovelAddRoute | NovelDeleteRoute>(
  '/api/novel'
)

export const getNovelList = async () => {
  const response = await client.list.$get().catch((err) => {
    throw new Error('ネットワークエラー', { cause: err })
  })

  if (!response.ok) {
    const err = await response.text().catch((err) => {
      throw new Error('予期しないエラーがレスポンスされました', { cause: err })
    })
    throw new Error(err)
  }

  const json = await response.json().catch((err) => {
    throw new Error('パース不可能な予期しないレスポンスです', { cause: err })
  })

  return json
}

export const addNovel = async (input: NovelAddInput) => {
  const response = await client.add
    .$post({ json: { url: input.url } })
    .catch((err) => {
      throw new Error('ネットワークエラー', { cause: err })
    })

  if (!response.ok) {
    const err = await response.text().catch((err) => {
      throw new Error('予期しないエラーがレスポンスされました', { cause: err })
    })
    throw new Error(err)
  }

  const json = await response.json().catch((err) => {
    throw new Error('パース不可能な予期しないレスポンスです', { cause: err })
  })

  return json
}

export const deleteNovel = async (input: NovelDeleteInput) => {
  const response = await client.delete
    .$delete({ json: { ncode: input.ncode } })
    .catch((err) => {
      throw new Error('ネットワークエラー', { cause: err })
    })

  if (!response.ok) {
    const err = await response.text().catch((err) => {
      throw new Error('予期しないエラーがレスポンスされました', { cause: err })
    })
    throw new Error(err)
  }

  const json = await response.json().catch((err) => {
    throw new Error('パース不可能な予期しないレスポンスです', { cause: err })
  })

  return json
}
