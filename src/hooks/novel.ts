import useSWR, { useSWRConfig } from 'swr'

export const useGetNovelsQuery = () => {
  const { data: novels } = useSWR<NarouItem[]>('/api/get')

  return { novels }
}

export const useAddNovelMutation = () => {
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

export const useDeleteNovelMutation = () => {
  const deleteNovel = async (ncode: string) => {
    await fetch('/api/del', {
      method: 'DELETE',
      body: JSON.stringify({ ncode }),
    })
  }

  return { deleteNovel }
}

export const useRefetchNovelMutation = () => {
  const { mutate } = useSWRConfig()

  const refetchNovel = () => mutate('/api/get')

  return { refetchNovel }
}
