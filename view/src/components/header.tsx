import { useForm } from 'react-hook-form'
import { IconLogo } from './icon-logo'
import { IconSend } from './icon-send'

type Props = {
  addOne: (url: string) => void
  refresh: () => void
}

export const Header = ({ addOne, refresh }: Props) => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const submit = handleSubmit(async ({ url }) => {
    addOne(url)
    reset()
  })

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
