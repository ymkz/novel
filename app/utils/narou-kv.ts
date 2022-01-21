import { NovelFromKv } from "~/types/novel"

export const getAll = async (kv: KVNamespace): Promise<NovelFromKv[]> => {
  const data = await kv.get<NovelFromKv[]>("data", "json")
  return data ?? []
}

export const addOne = async (
  kv: KVNamespace,
  novel: NovelFromKv
): Promise<void> => {
  const prev = await getAll(kv)
  const next = [...prev, novel]
  await kv.put("data", JSON.stringify(next))
}

export const removeOne = async (
  kv: KVNamespace,
  ncode: NovelFromKv["ncode"]
): Promise<void> => {
  const prev = await getAll(kv)
  const next = prev.filter((item) => item.ncode !== ncode)
  await kv.put("data", JSON.stringify(next))
}

export const updateOne = async (
  kv: KVNamespace,
  novel: NovelFromKv
): Promise<void> => {
  const prev = await getAll(kv)
  const next = prev.map((item) => (item.ncode === novel.ncode ? novel : item))
  await kv.put("data", JSON.stringify(next))
}
