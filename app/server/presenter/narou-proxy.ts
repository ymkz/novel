import { vValidator } from '@hono/valibot-validator'
import * as v from 'valibot'
import { getOriginalNarouUrl, getProxyNarouUrl, parseNcodeAndPage } from '../domain/narou/helper'
import { narouNcodeSchema, narouNovelPageSchema } from '../domain/narou/schema'
import { factory } from '../factory'
import { updateNovelUsecase } from '../usecase/update-novel'

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
	element: (element) => {
		const attribute = element.getAttribute('href')
		if (attribute) {
			if (attribute.match(/^\/n.+/)) {
				const { ncode, page } = parseNcodeAndPage(attribute)
				element.setAttribute('href', attribute.replace(/^\/n.+/, getProxyNarouUrl(ncode, page)))
			}
		}
	},
}

export const narouProxyHandlers = factory.createHandlers(
	vValidator(
		'param',
		v.object({
			ncode: narouNcodeSchema,
			page: narouNovelPageSchema,
		}),
	),
	async (ctx) => {
		const { ncode, page } = ctx.req.valid('param')
		const userAgent = ctx.req.header('user-agent') ?? ''
		const url = getOriginalNarouUrl(ncode, page)

		const [proxiedResponse] = await Promise.all([
			fetch(url, { headers: { 'user-agent': userAgent } }),
			updateNovelUsecase(ctx, ncode, page),
		])

		const response = new HTMLRewriter().on('a', narouLinkReplacer).transform(proxiedResponse)

		return response
	},
)
