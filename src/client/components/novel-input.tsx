import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { trpc } from '../../util/trpc'
import { IconSubmit } from './icon-submit'

export const NovelInput = () => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const queryClient = useQueryClient()
  const mutation = trpc.novel.add.useMutation({
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries(trpc.novel.list.getQueryKey())
    },
  })

  const submit = handleSubmit(async ({ url }) => {
    mutation.mutate({ url })
  })

  return (
    <div className="header">
      <div className="facade">
        <form className="form" onSubmit={submit}>
          <input
            className="input"
            placeholder="https://ncode.syosetu.com"
            {...register('url')}
          />
          <button className="submit" type="submit">
            <IconSubmit />
          </button>
        </form>
      </div>
    </div>
  )
}
