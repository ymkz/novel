import { NarouApiResponse, NovelContent } from '../types'

export async function getContent(ncode: string): Promise<NovelContent[]> {
  const USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
  const response = await fetch(
    `https://api.syosetu.com/novelapi/api?out=json&ncode=${ncode}`,
    { headers: { 'user-agent': USER_AGENT } }
  )
  // error handling by response.ok
  const [, ...data]: NarouApiResponse = await response.json()
  const contents = data.map<NovelContent>((item) => ({
    ncode: item.ncode.toLocaleLowerCase(),
    title: item.title,
    author: item.writer,
    totalPage: item.general_all_no,
    updatedAt: item.novelupdated_at,
  }))
  return contents
}
