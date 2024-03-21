import { css } from 'hono/css'

type Props = {
  src: string
}

export const ViewerContent = ({ src }: Props) => {
  const style = css`
    flex-grow: 1;
  `

  return (
    <div class={style}>
      <iframe title="iframe" style={{ width: '100%', height: '100%', border: 0 }} src={src} />
    </div>
  )
}
