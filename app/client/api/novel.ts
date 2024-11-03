import { hc } from 'hono/client'
import type { NovelsApi } from '../../server/app'

const client = hc<NovelsApi>('')

export const listNovels = async () => {
	const response = await client.novels.$get()
	const json = await response.json()
	return json
}

export const addNovel = async (url: string) => {
	const response = await client.novels.$post({ json: { url } })
	console.log(response)
}

export const removeNovel = async (ncode: string) => {
	const response = await client.novels[':ncode'].$delete({ param: { ncode } })
	console.log(response)
}
