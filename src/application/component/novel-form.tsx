import { IconSend } from '~/application/component/icon-send'

export const NovelForm = () => {
  return (
    <form class="flex gap:8px" hx-post="/api/narou" hx-target=".main">
      <input
        autoComplete="url"
        class="flex-grow:1 color:fade-20 color:fade-80::placeholder border-radius:4px background-color:fade-90 px:8px py:4px"
        name="url"
        type="url"
        placeholder="https://ncode.syosetu.com"
        required
      />
      <button class="w:32px height:32px grid place-items:center color:fade-40" type="submit">
        <IconSend />
      </button>
    </form>
  )
}
