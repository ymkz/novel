import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { fetchNarouApi } from '~/datasource/api/narou'
import { narouRepository } from '~/datasource/d1/narou'
import type { NarouNovel } from '~/domain/narou'
import { getLastPublishedAt, parseNcodeAndPage } from '~/domain/narou'

export const listNarouNovel = async (db: DrizzleD1Database, userAgent = ''): Promise<NarouNovel[]> => {
	const novels = await narouRepository.list(db)

	// データがない場合は空配列で早期リターンする
	if (novels.length === 0) {
		console.info({ msg: 'empty list novels' })
		return []
	}

	// なろうAPIから一括取得のためncodeをつなげる（フォーマット: `ncode-ncode`）
	const ncodeChain = novels.map((novel) => novel.ncode).join('-')
	const [, ...data] = await fetchNarouApi(ncodeChain, userAgent)
	console.info({ count: data.length, ncode: ncodeChain, msg: 'fetch from narou api' })

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
			currentPage: novels.find((record) => record.ncode === narouInfo.ncode)?.currentPage ?? 0,
		}))

	return narouNovelList
}

export const addNarouNovel = async (db: DrizzleD1Database, url: string): Promise<string> => {
	const { ncode, page } = parseNcodeAndPage(new URL(url).pathname)

	// ncode引きで存在チェック
	const exist = await narouRepository.find(db, ncode)

	// すでにDBニ対象の小説がある場合は更新処理とする
	if (exist) {
		// pageが一致する場合は処理をスキップする
		if (exist.currentPage === page) {
			console.info({ ncode, page, msg: 'skip by duplicate' })
			return `${ncode}/${page}は重複のためスキップしました`
		}

		// pageが一致しない場合はそのページを現在のページとして更新
		await narouRepository.update(db, ncode, page)
		console.info({ ncode, page, msg: 'update by add' })
		return `${ncode}はページを${page}で更新しました`
	}

	// DBに存在しない小説の場合は新規追加する
	await narouRepository.create(db, ncode, page)
	console.info({ ncode, page, msg: 'insert new' })
	return `${ncode}/${page}が新しく追加されました`
}

export const removeNarouNovel = async (db: DrizzleD1Database, ncode: string): Promise<void> => {
	await narouRepository.remove(db, ncode)
	console.info({ ncode, msg: 'remove' })
}

export const updateNarouNovel = async (db: DrizzleD1Database, ncode: string, page: number): Promise<void> => {
	await narouRepository.update(db, ncode, page)
	console.info({ ncode, page, msg: 'update' })
}
