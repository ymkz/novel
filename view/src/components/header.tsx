import { useForm } from 'react-hook-form'
import { IconLogo } from './icon-logo'
import { IconSend } from './icon-send'

type Props = {
  requestAdd: (url: string) => void
}

export const Header = ({ requestAdd }: Props) => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const submit = handleSubmit(async ({ url }) => {
    requestAdd(url)
    reset()
  })

  return (
    <header className="header">
      <div className="facade">
        <IconLogo width={22} height={22} />
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
