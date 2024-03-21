import { css } from 'hono/css'
import { IconSend } from '~/component/icon-send'

export const NovelForm = () => {
  const containerStyle = css`
    padding: 16px;
  `
  const formStyle = css`
    height: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f4f4f6;
    border-radius: 4px;
    padding-left: 12px;
  `
  const inputStyle = css`
    flex-grow: 1;
    outline: 0;
    border: 0;
    font-family: 'Meiryo';
    font-weight: 400;
    color: #24262d;
    ::placeholder {
      color: #c3c6cf;
    }
  `
  const buttonStyle = css`
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    color: #4c515f;
  `

  return (
    <header class={containerStyle}>
      <form class={formStyle} hx-post="/" hx-target="#root">
        <input
          autoComplete="url"
          class={inputStyle}
          name="url"
          type="url"
          placeholder="https://ncode.syosetu.com"
          required
        />
        <button class={buttonStyle} type="submit">
          <IconSend />
        </button>
      </form>
    </header>
  )
}
