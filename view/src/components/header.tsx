import { useForm } from 'react-hook-form'
import { useAddNovelInfo, useRefreshNovelData } from '../hooks/novel-info'
import { IconLogo } from './icon-logo'
import { IconSend } from './icon-send'

export const Header = () => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()
  const { mutate: refreshNovelData } = useRefreshNovelData()
  const { mutate: addNovelInfo } = useAddNovelInfo()

  const submit = handleSubmit(async ({ url }) => {
    addNovelInfo(url)
    reset()
  })

  const refresh = () => {
    refreshNovelData()
  }

  return (
    <header className="header">
      <div className="facade">
        <IconLogo width={22} height={22} onClick={refresh} />
        <form className="form" onSubmit={submit}>
          <input
            className="input"
            type="url"
            placeholder="https://ncode.syosetu.com"
            {...register('url')}
          />
          <button className="send" type="submit">
            <IconSend width={20} height={20} />
          </button>
        </form>
      </div>
    </header>
  )
}
