import type { Context } from 'hono'
import type { AppEnv } from '../factory'
import { removeNovel } from '../gateway/datasource/novel'

export const removeNovelUsecase = async (ctx: Context<AppEnv>, ncode: string): Promise<void> => {
	await removeNovel(ctx.env.DB)(ncode)
	console.info({ ncode, msg: 'remove succeeded' })
}
