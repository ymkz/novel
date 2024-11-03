import type { Context } from 'hono'
import { getLastPublishedAt } from '../domain/narou/helper'
import type { NarouNovel } from '../domain/narou/model'
import type { AppEnv } from '../factory'
import { listNovels } from '../gateway/datasource/novel'
import { fetchNarouApi } from '../gateway/externalapi/narou'

export const listNovelsUsecase = async (ctx: Context<AppEnv>): Promise<NarouNovel[]> => {
	const novels = await listNovels(ctx.env.DB)()

	// データがない場合は空配列で早期リターンする
	if (novels.results.length === 0) {
		console.info({ msg: 'empty list novels' })
		return []
	}

	// なろうAPIから一括取得のためncodeをつなげる（フォーマット: `ncode-ncode`）
	const ncodeChain = novels.results.map((novel) => novel.ncode).join('-')
	const userAgent = ctx.req.header('user-agent') ?? ''
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
			currentPage: novels.results.find((record) => record.ncode === narouInfo.ncode)?.currentPage ?? 0,
		}))

	return narouNovelList
}
