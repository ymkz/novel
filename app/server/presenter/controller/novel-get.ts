import { vValidator } from '@hono/valibot-validator'
import * as v from 'valibot'
import { narouNcodeSchema } from '../../domain/narou/schema'
import { factory } from '../../factory'
import { getNovelUsecase } from '../../usecase/get-novel'

export const novelGetHandlers = factory.createHandlers(
	vValidator(
		'param',
		v.object({
			ncode: narouNcodeSchema,
		}),
	),
	async (ctx) => {
		const { ncode } = ctx.req.valid('param')

		const novel = await getNovelUsecase(ctx, ncode)

		return ctx.json({ novel }, 200)
	},
)
