type NovelEntity = {
	ncode: string
	currentPage: number
}

export const listNovels = (db: D1Database) => {
	return async () => {
		const result = await db.prepare('SELECT ncode, current_page as currentPage FROM narou').all<NovelEntity>()
		console.log({ msg: 'd1 query executed' })
		return result
	}
}

export const findNovel = (db: D1Database) => {
	return async (ncode: string) => {
		const result = await db
			.prepare('SELECT ncode, current_page as currentPage FROM narou WHERE ncode = ?')
			.bind(ncode)
			.first<NovelEntity>()
		console.log({ msg: 'd1 query executed' })
		return result
	}
}

export const addNovel = (db: D1Database) => {
	return async (ncode: string, page: number) => {
		const result = await db.prepare('INSERT INTO narou (ncode, current_page) VALUES (?, ?)').bind(ncode, page).run()
		console.log({ msg: 'd1 query executed' })
	}
}

export const updateNovel = (db: D1Database) => {
	return async (ncode: string, page: number) => {
		const result = await db.prepare('UPDATE narou SET current_page = ? WHERE ncode = ?').bind(page, ncode).run()
		console.log({ msg: 'd1 query executed' })
	}
}

export const removeNovel = (db: D1Database) => {
	return async (ncode: string) => {
		const result = await db.prepare('DELETE FROM narou WHERE ncode = ?').bind(ncode).run()
		console.log({ msg: 'd1 query executed' })
	}
}
