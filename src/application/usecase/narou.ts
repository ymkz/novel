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
  const novels = await getNovelAll(kv)

  // データがない場合は空配列で早期リターンする
  if (novels.length === 0) {
    console.info('get novels : empty')
    return []
  }

  // なろうAPIから一括取得のためncodeをつなげる（フォーマット: `ncode-ncode`）
  const ncodeChain = novels.map((novel) => novel.ncode).join('-')
  const [, ...data] = await fetchNarouApi(ncodeChain, userAgent)
  console.info(`fetch from narou api : ncode=${ncodeChain}`)

  const narouNovelList = data
    // なろうAPIのレスポンスから必要な情報のみ抽出
    .map((item) => ({
      ncode: item.ncode,
      title: item.title,
      totalPage: item.general_all_no,
      lastPublishedAt: item.general_lastup,
    }))
    // 更新日の新しい順（降順）で並び替え
    .toSorted((a, b) => Date.parse(b.lastPublishedAt) - Date.parse(a.lastPublishedAt))
    // ncodeのフォーマットを統一し、更新日を表示用に整形
    .map((item) => ({
      ...item,
      ncode: item.ncode.toLowerCase(),
      lastPublishedAt: getLastPublishedAt(item.lastPublishedAt),
    }))
    // KVにある現在のページ番号をデータにマージ
    .map<NarouNovel>((narouInfo) => ({
      ...narouInfo,
      currentPage:
        novels.find((kvNovelItem) => kvNovelItem.ncode === narouInfo.ncode)?.currentPage ?? 0,
    }))

  console.info(`get novels : length=${narouNovelList.length}`)

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
      console.info(`skip by duplicate : ncode=${ncode} page=${page}`)
      return `duplicate ncode=${ncode} page=${page}`
    }
    // pageが一致しない場合はそのページを現在のページとして更新
    await updateNovelOne(kv, { ncode, currentPage: page })
    console.info(`update by add : ncode=${ncode} page=${page}`)
    return `update ncode=${ncode} page=${page}`
  }

  // 存在しない小説の場合はKVに追加する
  await addNovelOne(kv, { ncode, currentPage: page })
  console.info(`add new : ncode=${ncode} page=${page}`)
  return `add ncode=${ncode} page=${page}`
}

export const deleteNarouNovel = async (kv: KVNamespace, ncode: string) => {
  await deleteNovelOne(kv, ncode)
  console.info(`delete : ncode=${ncode} ncode=${ncode}`)
}

export const updateNarouNovel = async (kv: KVNamespace, ncode: string, page: number) => {
  await updateNovelOne(kv, { ncode, currentPage: page })
  console.info(`update : ncode=${ncode} page=${page}`)
}
