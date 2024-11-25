import { hc } from 'hono/client'
import type { NovelsApi } from '../../server/app'

const client = hc<NovelsApi>('')

export const listNovels = async () => {
	const response = await client.api.novels.$get()
	const json = await response.json()
	return json
}

export const getNovel = async (ncode: string) => {
	const response = await client.api.novels[':ncode'].$get({ param: { ncode } })
	const json = await response.json()
	return json
}

export const addNovel = async (url: string) => {
	await client.api.novels.$post({ json: { url } })
}

export const removeNovel = async (ncode: string) => {
	await client.api.novels[':ncode'].$delete({ param: { ncode } })
}
