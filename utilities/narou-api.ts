import { dayjs } from '../utilities/app-date'

export async function fetchNarouApiResult(
  ncode: string,
  req: Request
): Promise<NovelFromNarouApi[]> {
  const url = `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`
  const userAgent = req.headers.get('user-agent') ?? ''
  const response = await fetch(url, { headers: { 'user-agent': userAgent } })
  const [, ...data]: NarouApiResponse = await response.json()
  return data
    .map<NovelFromNarouApi>((item) => ({
      ncode: item.ncode.toLocaleLowerCase(),
      title: item.title,
      author: item.writer,
      totalPage: item.general_all_no,
      lastPublishedAt: dayjs(item.general_lastup).unix(),
    }))
    .sort((a, b) => a.lastPublishedAt + b.lastPublishedAt)
}
