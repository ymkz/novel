import type { Context } from 'hono'
import { getLastPublishedAt } from '../domain/narou/helper'
import type { NarouNovel } from '../domain/narou/model'
import type { AppEnv } from '../factory'
import { findNovel } from '../gateway/datasource/novel'
import { fetchNarouApi } from '../gateway/externalapi/narou'

export const getNovelUsecase = async (ctx: Context<AppEnv>, ncode: string): Promise<NarouNovel> => {
	const novel = await findNovel(ctx.env.DB)(ncode)

	// データがない場合は空配列で早期リターンする
	if (!novel) {
		console.info({ msg: 'not found novel' })
		throw new Error('novel not found')
	}

	const userAgent = ctx.req.header('user-agent') ?? ''
	const [, ...data] = await fetchNarouApi(novel.ncode, userAgent)
	console.info({ count: data.length, ncode: novel.ncode, msg: 'fetch from narou api' })

	const [narouNovel] = data
		// なろうAPIのレスポンスから必要な情報のみ抽出
		.map((item) => ({
			ncode: item.ncode,
			title: item.title,
			author: item.writer,
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
			currentPage: novel.currentPage,
		}))

	return narouNovel
}
