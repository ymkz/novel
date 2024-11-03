type NarouApiResponseAllCount = {
	allcount: number
}

type NarouApiResponseNovelData = {
	title: string
	ncode: string
	userid: number
	writer: string
	story: string
	biggenre: number
	genre: number
	gensaku: string
	keyword: string
	general_firstup: string
	general_lastup: string
	novel_type: number
	end: number
	general_all_no: number
	length: number
	time: number
	isstop: number
	isr15: number
	isbl: number
	isgl: number
	iszankoku: number
	istensei: number
	istenni: number
	pc_or_k: number
	global_point: number
	daily_point: number
	weekly_point: number
	monthly_point: number
	quarter_point: number
	yearly_point: number
	fav_novel_cnt: number
	impression_cnt: number
	review_cnt: number
	all_point: number
	all_hyoka_cnt: number
	sasie_cnt: number
	kaiwaritu: number
	novelupdated_at: string
	updated_at: string
}

type NarouApiResponse = [NarouApiResponseAllCount, ...NarouApiResponseNovelData[]]

/**
 * @see https://dev.syosetu.com/man/api/
 */
export const fetchNarouApi = async (ncode: string, userAgent: string): Promise<NarouApiResponse> => {
	const url = `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`

	const response = await fetch(url, {
		headers: { 'user-agent': userAgent },
	}).catch((err) => {
		throw new Error('なろうAPIとの通信に失敗しました', { cause: err })
	})

	if (!response.ok) {
		throw new Error('なろうAPIからエラーがレスポンスされました')
	}

	const json = (await response.json().catch((err) => {
		throw new Error(
			`なろうAPIからJSONと異なるフォーマットでレスポンスされました content-type=${response.headers.get(
				'content-type',
			)}`,
			{ cause: err },
		)
	})) as NarouApiResponse

	return json
}
