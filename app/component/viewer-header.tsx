import { css } from 'hono/css'

type Props = {
  ncode: string
}

export const ViewerHeader = ({ ncode }: Props) => {
  const containerStyle = css`
    height: 32px;
    padding-inline: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  const removeButton = css`
    font-family: sans;
    font-weight: 400;
    font-size: 11px;
    color: #d11a1e;
  `
  const closeButton = css`
    font-family: sans;
    font-weight: 400;
    font-size: 11px;
    color: #24262d;
  `

  return (
    <div class={containerStyle}>
      <form hx-post={`/api/narou/${ncode}`} hx-trigger="click">
        <span class={removeButton}>削除</span>
      </form>
      <a href="/" class={closeButton}>
        閉じる
      </a>
    </div>
  )
}
