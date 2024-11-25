import type { Context } from 'hono'
import { parseNcodeAndPage } from '../domain/narou/helper'
import type { AppEnv } from '../factory'
import { addNovel, findNovel, updateNovel } from '../gateway/datasource/novel'

export const addNovelUsecase = async (ctx: Context<AppEnv>, url: string): Promise<string> => {
	const { ncode, page } = parseNcodeAndPage(new URL(url).pathname)

	// ncode引きで存在チェック
	const exist = await findNovel(ctx.env.DB)(ncode)

	// すでにDBニ対象の小説がある場合は更新処理とする
	if (exist) {
		// 現在のページが一致する場合は処理をスキップする
		if (exist.currentPage === page) {
			console.info({ ncode, page, msg: 'skip by duplicate' })
			return `${ncode}/${page}は重複のためスキップしました`
		}

		// 現在のページが一致しない場合は入力のページを現在のページとして更新
		await updateNovel(ctx.env.DB)(ncode, page)
		console.info({ ncode, page, msg: 'update by add' })
		return `${ncode}はページを${page}で更新しました`
	}

	// DBに存在しない小説の場合は新規追加する
	await addNovel(ctx.env.DB)(ncode, page)
	console.info({ ncode, page, msg: 'insert new' })
	return `${ncode}/${page}が新しく追加されました`
}
