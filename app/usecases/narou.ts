import { NarouNovel, parseNcodeAndPageFromUrl } from '~/domains/narou'
import { getLastPublishedAt } from '~/domains/narou'
import { fetchNarouApi } from '~/infrastructures/api/narou'
import {
  createNarouNovel,
  deleteNarouNovel,
  getNarouNovel,
  listNarouNovels,
  updateNarouNovel,
} from '~/infrastructures/d1/querier'

export const list = async (d1: D1Database, userAgent = '') => {
  const novels = await listNarouNovels(d1)

  // データがない場合は空配列で早期リターンする
  if (novels.results.length === 0) {
    console.info('get novels : empty')
    return []
  }

  // なろうAPIから一括取得のためncodeをつなげる（フォーマット: `ncode-ncode`）
  const ncodeChain = novels.results.map((novel) => novel.ncode).join('-')
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
    // DBにある現在のページ番号をデータにマージ
    .map<NarouNovel>((narouInfo) => ({
      ...narouInfo,
      currentPage:
        novels.results.find((record) => record.ncode === narouInfo.ncode)?.currentPage ?? 0,
    }))

  console.info(`get novels : count=${narouNovelList.length}`)

  return narouNovelList
}

export const add = async (d1: D1Database, url: string) => {
  const { ncode, page } = parseNcodeAndPageFromUrl(new URL(url).pathname)

  // ncode引きで存在チェック
  const exist = await getNarouNovel(d1, { ncode })

  // すでに対象の小説がある場合は更新処理とする
  if (exist) {
    // pageが一致する場合は処理をスキップする
    if (exist.currentPage === page) {
      console.info(`skip by duplicate : ncode=${ncode} page=${page}`)
      return `duplicate ncode=${ncode} page=${page}`
    }

    // pageが一致しない場合はそのページを現在のページとして更新
    await updateNarouNovel(d1, { ncode, currentPage: page })
    console.info(`update by add : ncode=${ncode} page=${page}`)
    return `update ncode=${ncode} page=${page}`
  }

  // 存在しない小説の場合はDBに追加する
  await createNarouNovel(d1, { ncode, currentPage: page })
  console.info(`add new : ncode=${ncode} page=${page}`)
  return `add ncode=${ncode} page=${page}`
}

export const remove = async (d1: D1Database, ncode: string) => {
  await deleteNarouNovel(d1, { ncode })
  console.info(`delete : ncode=${ncode} ncode=${ncode}`)
}

export const update = async (d1: D1Database, ncode: string, page: number) => {
  await updateNarouNovel(d1, { ncode, currentPage: page })
  console.info(`update : ncode=${ncode} page=${page}`)
}
