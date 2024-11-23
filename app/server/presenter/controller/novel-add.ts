import { vValidator } from '@hono/valibot-validator'
import * as v from 'valibot'
import { narouNovelPageUrlSchema } from '../../domain/narou/schema'
import { factory } from '../../factory'
import { addNovelUsecase } from '../../usecase/add-novel'

export const novelAddHandlers = factory.createHandlers(
	vValidator(
		'json',
		v.object({
			url: narouNovelPageUrlSchema,
		}),
	),
	async (ctx) => {
		const { url } = ctx.req.valid('json')

		const message = await addNovelUsecase(ctx, url)

		return ctx.json({ message }, 201)
	},
)
