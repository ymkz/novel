import { NarouNovel, parseNcodeAndPageFromUrl } from '~/domain/narou'
import { getLastPublishedAt } from '~/domain/string'
import { fetchNarouApi } from '~/infrastructure/api/narou'
import {
  addNovelOne,
  deleteNovelOne,
  getNovelAll,
  getNovelOne,
  updateNovelOne,
} from '~/infrastructure/kv'

export const getNarouNovelList = async (kv: KVNamespace, userAgent: string) => {
  const kvNovelList = await getNovelAll(kv)

  // データがない場合は空配列で早期リターンする
  if (kvNovelList.length === 0) {
    return []
  }

  const ncodes = kvNovelList.map((novel) => novel.ncode).join('-')
  const [, ...data] = await fetchNarouApi(ncodes, userAgent)
  const narouNovelList = data
    .map((item) => ({
      ncode: item.ncode,
      title: item.title,
      totalPage: item.general_all_no,
      lastPublishedAt: item.general_lastup,
    }))
    .toSorted((a, b) => Date.parse(b.lastPublishedAt) - Date.parse(a.lastPublishedAt))
    .map((item) => ({
      ...item,
      ncode: item.ncode.toLowerCase(),
      lastPublishedAt: getLastPublishedAt(item.lastPublishedAt),
    }))
    .map<NarouNovel>((narouInfo) => ({
      ...narouInfo,
      currentPage:
        kvNovelList.find((kvNovelItem) => kvNovelItem.ncode === narouInfo.ncode)?.currentPage ?? 0,
    }))

  return narouNovelList
}

export const addNarouNovel = async (kv: KVNamespace, url: string) => {
  const { ncode, page } = parseNcodeAndPageFromUrl(url)

  // ncode引きで存在チェック
  const exist = await getNovelOne(kv, ncode)

  // すでに対象の小説がある場合は更新処理とする
  if (exist) {
    // pageが一致する場合は処理をスキップする
    if (exist.currentPage === page) {
      console.log(`duplicate ncode=${ncode} page=${page}`)
      return `duplicate ncode=${ncode} page=${page}`
    }
    // pageが一致しない場合はそのページを現在のページとして更新
    await updateNovelOne(kv, { ncode, currentPage: page })
    console.log(`update ncode=${ncode} page=${page}`)
    return `update ncode=${ncode} page=${page}`
  }

  // 存在しない小説の場合はKVに追加する
  await addNovelOne(kv, { ncode, currentPage: page })
  console.log(`add ncode=${ncode} page=${page}`)
  return `add ncode=${ncode} page=${page}`
}

export const deleteNarouNovel = async (kv: KVNamespace, ncode: string) => {
  await deleteNovelOne(kv, ncode)
}

export const updateNarouNovel = async (kv: KVNamespace, ncode: string, page: number) => {
  await updateNovelOne(kv, { ncode, currentPage: page })
}
