import { NovelInfo } from '../types'

export async function getAll(db: KVNamespace): Promise<NovelInfo[]> {
  return (await db.get<NovelInfo[]>('data', 'json')) ?? []
}

export async function addOne(
  db: KVNamespace,
  novelInfo: NovelInfo
): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev ? [...prev, novelInfo] : [novelInfo]
  await db.put('data', JSON.stringify(next))
}

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

export async function updateAll(
  db: KVNamespace,
  novelData: NovelInfo[]
): Promise<void> {
  await db.put('data', JSON.stringify(novelData))
}

export async function removeOne(db: KVNamespace, ncode: string): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev ? prev.filter((item) => item.ncode !== ncode) : []
  await db.put('data', JSON.stringify(next))
}
