import { NovelInfo } from '../types'

export async function getData(db: KVNamespace): Promise<NovelInfo[]> {
  return (await db.get<NovelInfo[]>('data', 'json')) ?? []
}

export async function addData(
  db: KVNamespace,
  novelInfo: NovelInfo
): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev ? [...prev, novelInfo] : [novelInfo]
  await db.put('data', JSON.stringify(next))
}

export async function updateData(
  db: KVNamespace,
  ncode: string,
  novelInfo: NovelInfo
): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev
    ? prev.map((item) => (item.ncode === ncode ? novelInfo : item))
    : []
  await db.put('data', JSON.stringify(next))
}

export async function updateAll(
  db: KVNamespace,
  novelData: NovelInfo[]
): Promise<void> {
  await db.put('data', JSON.stringify(novelData))
}

export async function deleteData(
  db: KVNamespace,
  ncode: string
): Promise<void> {
  const prev = await db.get<NovelInfo[]>('data', 'json')
  const next = prev ? prev.filter((item) => item.ncode !== ncode) : []
  await db.put('data', JSON.stringify(next))
}
