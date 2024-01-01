export type KVNarou = {
  ncode: string
  currentPage: number
}

export const getNovelData = async (kv: KVNamespace): Promise<KVNarou[]> => {
  const data = await kv.get<KVNarou[]>('narou', 'json')
  return data ?? []
}

export const addNovelItem = async (kv: KVNamespace, data: KVNarou): Promise<void> => {
  const prev = await getNovelData(kv)
  const next = [data, ...prev]
  await kv.put('narou', JSON.stringify(next))
}

export const deleteNovelItem = async (kv: KVNamespace, ncode: KVNarou['ncode']): Promise<void> => {
  const prev = await getNovelData(kv)
  const next = prev.filter((item) => item.ncode !== ncode)
  await kv.put('narou', JSON.stringify(next))
}

export const updateNovelItem = async (kv: KVNamespace, novel: KVNarou): Promise<void> => {
  const prev = await getNovelData(kv)
  const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
  await kv.put('narou', JSON.stringify(next))
}
