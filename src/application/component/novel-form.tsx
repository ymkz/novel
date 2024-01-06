import { IconSend } from '~/application/component/icon-send'

export const NovelForm = () => {
  return (
    <header class="p:16px">
      <form class="flex gap:12px" hx-post="/api/narou" hx-target="#root">
        <input
          autoComplete="url"
          class="flex-grow:1 r:4px bg:fade-90 p:4px|8px font-family:sans font-weight:400 color:fade-20 color:fade-80::placeholder"
          name="url"
          type="url"
          placeholder="https://ncode.syosetu.com"
          required
        />
        <button class="w:32px h:32px grid place-items:center color:fade-40" type="submit">
          <IconSend />
        </button>
      </form>
    </header>
  )
}
