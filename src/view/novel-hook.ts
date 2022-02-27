import useSWR, { useSWRConfig } from 'swr'

export const useNovels = () => {
  const { data: novels } = useSWR<NovelForView[]>('/api/get')

  return { novels }
}

export const useNovelAdd = () => {
  const { mutate } = useSWRConfig()

  const addNovel = async (url: string) => {
    await fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
    await mutate('/api/get')
  }

  return { addNovel }
}

export const useNovelDelete = () => {
  const { mutate } = useSWRConfig()

  const deleteNovel = async (ncode: string) => {
    await fetch('/api/del', {
      method: 'DELETE',
      body: JSON.stringify({ ncode }),
    })
    await mutate('/api/get')
  }

  return { deleteNovel }
}

export const useNovelRevalidate = () => {
  const { mutate } = useSWRConfig()

  const revalidate = () => mutate('/api/get')

  return { revalidate }
}
