import { useMutation, useQuery, useQueryClient } from 'react-query'
import { NovelInfo } from '../types'

export const useNovelInfoQuery = () => {
  return useQuery<NovelInfo[]>('/api/get', () =>
    fetch('/api/get').then((res) => res.json())
  )
}

export const useAddNovelInfo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (url: string) => {
      return fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('/api/get'),
    }
  )
}

export const useRemoveNovelInfo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (ncode: NovelInfo['ncode']) => {
      return fetch('/api/remove', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ncode }),
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('/api/get'),
    }
  )
}

export const useRefreshNovelData = () => {
  const queryClient = useQueryClient()
  return useMutation(
    () => {
      return fetch('/api/refresh', { method: 'PATCH' })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('/api/get'),
    }
  )
}
