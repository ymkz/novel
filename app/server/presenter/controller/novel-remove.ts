import { vValidator } from '@hono/valibot-validator'
import * as v from 'valibot'
import { narouNcodeSchema } from '../../domain/narou/schema'
import { factory } from '../../factory'
import { removeNovelUsecase } from '../../usecase/remove-novel'

export const novelRemoveHandlers = factory.createHandlers(
	vValidator(
		'param',
		v.object({
			ncode: narouNcodeSchema,
		}),
	),
	async (ctx) => {
		const { ncode } = ctx.req.valid('param')

		await removeNovelUsecase(ctx, ncode)

		return ctx.body(null, 204)
	},
)
