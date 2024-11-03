import type { Context } from 'hono'
import type { AppEnv } from '../factory'
import { findNovel, updateNovel } from '../gateway/datasource/novel'

export const updateNovelUsecase = async (ctx: Context<AppEnv>, ncode: string, page: number): Promise<void> => {
	const novel = await findNovel(ctx.env.DB)(ncode)

	// 現在のページが一致する場合は処理をスキップする
	if (novel?.currentPage === page) {
		console.info({ ncode, page, msg: 'skip by no change' })
		return
	}

	// 現在のページが異なる場合は新規追加する
	await updateNovel(ctx.env.DB)(ncode, page)
	console.info({ ncode, msg: 'update succeeded' })
}
