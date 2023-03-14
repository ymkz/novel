type KVNovelItem = {
  ncode: string
  currentPage: number
}

export const getNovelData = async (
  kv: KVNamespace<'novel-data'>
): Promise<KVNovelItem[]> => {
  const data = await kv.get<KVNovelItem[]>('novel-data', 'json')
  return data ?? []
}

export const addNovelItem = async (
  kv: KVNamespace<'novel-data'>,
  data: KVNovelItem
): Promise<void> => {
  const prev = await getNovelData(kv)

  if (prev.find((i) => i.ncode === data.ncode)) {
    throw new Error(`already exist ${data.ncode}`)
  }

  const next = [data, ...prev]
  await kv.put('novel-data', JSON.stringify(next))
}

export const deleteNovelItem = async (
  kv: KVNamespace<'novel-data'>,
  ncode: KVNovelItem['ncode']
): Promise<void> => {
  const prev = await getNovelData(kv)
  const next = prev.filter((item) => item.ncode !== ncode)
  await kv.put('novel-data', JSON.stringify(next))
}

export const updateNovelItem = async (
  kv: KVNamespace<'novel-data'>,
  novel: KVNovelItem
): Promise<void> => {
  const prev = await getNovelData(kv)
  const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
  await kv.put('novel-data', JSON.stringify(next))
}
