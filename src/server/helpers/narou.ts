import dayjs from 'dayjs'

type NarouInfo = {
  ncode: string
  title: string
  author: string
  totalPage: number
  lastPublishedAt: number
}

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

type NarouApiResponse = [
  NarouApiResponseAllCount,
  ...NarouApiResponseNovelData[]
]

export async function fetchNarouInfoFromNarouApi(
  ncode: string,
  userAgent: string
): Promise<NarouInfo[]> {
  const url = `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`

  const response = await fetch(url, {
    headers: { 'user-agent': userAgent },
  }).catch((err) => {
    throw new Error('fetch narou info fail on client', { cause: err })
  })

  if (!response.ok) {
    throw new Error('fetch narou info fail on server')
  }

  const [, ...data] = await response.json<NarouApiResponse>()

  return data
    .map<NarouInfo>((item) => ({
      ncode: item.ncode.toLocaleLowerCase(),
      title: item.title,
      author: item.writer,
      totalPage: item.general_all_no,
      lastPublishedAt: dayjs(item.general_lastup).unix(),
    }))
    .sort((a, b) => a.lastPublishedAt + b.lastPublishedAt)
}
