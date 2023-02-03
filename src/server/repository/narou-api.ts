import { toUnixTime } from '../../util/date'

export async function fetchNarouInfo(
  ncode: string,
  userAgent: string
): Promise<NarouInfo[]> {
  const url = `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`

  const response = await fetch(url, {
    headers: { 'user-agent': userAgent },
  }).catch((err) => {
    throw new Error('FetchNarouInfoFailOnClient', { cause: err })
  })

  if (!response.ok) {
    throw new Error('FetchNarouInfoFailOnServer')
  }

  const [, ...data] = await response.json<NarouApiResponse>()

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
