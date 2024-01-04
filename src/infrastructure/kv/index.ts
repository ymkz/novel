export type KVNarou = {
  ncode: string
  currentPage: number
}

export const getNovelOne = async (
  kv: KVNamespace,
  ncode: KVNarou['ncode'],
): Promise<KVNarou | undefined> => {
  const data = await kv.get<KVNarou[]>('narou', 'json')
  return data?.find((item) => item.ncode === ncode)
}

export const getNovelAll = async (kv: KVNamespace): Promise<KVNarou[]> => {
  const data = await kv.get<KVNarou[]>('narou', 'json')
  return data ?? []
}

export const addNovelOne = async (kv: KVNamespace, data: KVNarou): Promise<void> => {
  const prev = await getNovelAll(kv)
  const next = [data, ...prev]
  await kv.put('narou', JSON.stringify(next))
}

export const deleteNovelOne = async (kv: KVNamespace, ncode: KVNarou['ncode']): Promise<void> => {
  const prev = await getNovelAll(kv)
  const next = prev.filter((item) => item.ncode !== ncode)
  await kv.put('narou', JSON.stringify(next))
}

export const updateNovelOne = async (kv: KVNamespace, novel: KVNarou): Promise<void> => {
  const prev = await getNovelAll(kv)
  const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
  await kv.put('narou', JSON.stringify(next))
}
