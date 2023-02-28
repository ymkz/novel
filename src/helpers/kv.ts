import { Novel } from '../models/novel'

export const getNarouData = async (kv: KVNamespace): Promise<Novel[]> => {
  const data = await kv.get<Novel[]>('narou-data', 'json')
  return data ?? []
}

export const addNarouItem = async (
  kv: KVNamespace,
  data: Novel
): Promise<void> => {
  const prev = await getNarouData(kv)

  if (prev.find((i) => i.ncode === data.ncode)) {
    throw new Error(`already exist ${data.ncode}`)
  }

  const next = [data, ...prev]
  await kv.put('narou-data', JSON.stringify(next))
}

export const deleteNarouItem = async (
  kv: KVNamespace,
  ncode: Novel['ncode']
): Promise<void> => {
  const prev = await getNarouData(kv)
  const next = prev.filter((item) => item.ncode !== ncode)
  await kv.put('narou-data', JSON.stringify(next))
}

export const updateNarouItem = async (
  kv: KVNamespace,
  novel: Novel
): Promise<void> => {
  const prev = await getNarouData(kv)
  const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
  await kv.put('narou-data', JSON.stringify(next))
}
