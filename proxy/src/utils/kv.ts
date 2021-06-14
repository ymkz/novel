import { NovelInfo } from '../types'

export async function updateOne(
  db: KVNamespace,
  novelInfo: NovelInfo
): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev
    ? prev.map((item) => (item.ncode === novelInfo.ncode ? novelInfo : item))
    : []
  await db.put('data', JSON.stringify(next))
}
