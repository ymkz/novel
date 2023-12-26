import { IconSend } from '~/application/component/icon-send'

export const NovelForm = () => {
  return (
    <form class="form" hx-post="/api/narou" hx-target=".main">
      <input
        autoComplete="url"
        class="input"
        name="url"
        type="url"
        placeholder="https://ncode.syosetu.com"
        required
      />
      <button class="icon-button" type="submit">
        <IconSend />
      </button>
    </form>
  )
}
