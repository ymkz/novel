import { E } from '../error'

export const getNarouData = async (kv: KVNamespace): Promise<KVNarouItem[]> => {
  try {
    const data = await kv.get<KVNarouItem[]>('narou-data', 'json')
    return data ?? []
  } catch {
    throw E.KvGetNarouDataFailure
  }
}

export const addNarouItem = async (
  kv: KVNamespace,
  data: KVNarouItem
): Promise<void> => {
  try {
    const prev = await getNarouData(kv)
    const next = [data, ...prev]
    await kv.put('narou-data', JSON.stringify(next))
  } catch {
    throw E.KvAddNarouItemFailure
  }
}

export const deleteNarouItem = async (
  kv: KVNamespace,
  ncode: KVNarouItem['ncode']
): Promise<void> => {
  try {
    const prev = await getNarouData(kv)
    const next = prev.filter((item) => item.ncode !== ncode)
    await kv.put('narou-data', JSON.stringify(next))
  } catch {
    throw E.KvDeleteNarouItemFailure
  }
}

export const updateNarouItem = async (
  kv: KVNamespace,
  novel: KVNarouItem
): Promise<void> => {
  try {
    const prev = await getNarouData(kv)
    const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
    await kv.put('narou-data', JSON.stringify(next))
  } catch {
    throw E.KvUpdateNarouItemFailure
  }
}
