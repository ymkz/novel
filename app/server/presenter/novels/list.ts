import { factory } from '../../factory'
import { listNovelsUsecase } from '../../usecase/list-novels'

export const novelListHandlers = factory.createHandlers(async (ctx) => {
	const novels = await listNovelsUsecase(ctx)
	return ctx.json({ novels }, 200)
})
