import { useForm } from 'react-hook-form'
import { useAddNovelMutation } from '../hooks/novel'
import { IconSubmit } from './icon-submit'

export const NovelInput = () => {
  const { addNovel } = useAddNovelMutation()
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const submit = handleSubmit(async (value) => {
    await addNovel(value.url)
    reset()
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
