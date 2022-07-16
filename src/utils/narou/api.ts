import { toUnixTime } from '../date'
import { E } from '../error'

export async function fetchNarouInfo(
  ncode: string,
  userAgent: string
): Promise<NarouInfo[]> {
  const url = `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`

  const response = await fetch(url, {
    headers: { 'user-agent': userAgent },
  }).catch(() => {
    throw E.FetchNarouInfoFailOnClient
  })

  if (!response.ok) {
    throw E.FetchNarouInfoFailOnServer
  }

  const [, ...data] = await response.json<NarouApiResponse>().catch(() => {
    throw E.FetchNarouInfoCannotParse
  })

  return data
    .map<NarouInfo>((item) => ({
      ncode: item.ncode.toLocaleLowerCase(),
      title: item.title,
      author: item.writer,
      totalPage: item.general_all_no,
      lastPublishedAt: toUnixTime(item.general_lastup),
    }))
    .sort((a, b) => a.lastPublishedAt + b.lastPublishedAt)
}
