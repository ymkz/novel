import { css } from 'hono/css'
import openprops from 'open-props'

type Props = {
  message: string
}

export const Message = ({ message }: Props) => {
  const style = css`
    padding-inline: ${openprops.size4};
  `

  return (
    <div hx-ext="remove-me" class={style}>
      <div remove-me="3s">{message}</div>
    </div>
  )
}
