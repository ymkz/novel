export const parseNcodeAndPage = (
	url: string,
): {
	ncode: string
	page: number
} => {
	const regex = /\/(?<ncode>n[a-zA-Z0-9]+)\/?(?<page>\d*).*$/
	const matches = regex.exec(url)
	if (!matches) {
		console.error({ url, msg: 'invalid url for narou novel' })
		throw new Error(`invalid url for narou novel : url=${url}`)
	}
	const { ncode, page } = matches.groups as {
		ncode: string
		page?: string
	}
	return { ncode, page: Number(page) }
}

/**
 * YYYY-MM-DD HH:mm:ss → YYYY年MM月DD日HH時mm分
 */
export const getLastPublishedAt = (datetime: string): string => {
	const date = new Date(datetime)
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`
}

export const getPageInfo = (currentPage: number, totalPage: number) => {
	return `${currentPage}話／全${totalPage}話`
}

export const getOriginalNarouUrl = (ncode: string, page: number) => {
	if (page === 0) {
		return `https://ncode.syosetu.com/${ncode}`
	}
	return `https://ncode.syosetu.com/${ncode}/${page}`
}

export const getProxyNarouUrl = (ncode: string, page: number) => {
	return `/narou/${ncode}/${page}`
}
