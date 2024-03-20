import { IconSend } from '~/component/icon-send'

export const NovelForm = () => {
  return (
    <header class="p:16px">
      <form
        class="height:40px flex align-items:center gap:12px bg:fade-90 r:4px pl:12px"
        hx-post="/"
        hx-target="#root"
      >
        <input
          autoComplete="url"
          class="flex-grow:1 font-family:'Meiryo' font-weight:400 color:fade-20 color:fade-80::placeholder outline:0 border:0"
          name="url"
          type="url"
          placeholder="https://ncode.syosetu.com"
          required
        />
        <button class="w:40px h:40px grid place-items:center color:fade-40" type="submit">
          <IconSend />
        </button>
      </form>
    </header>
  )
}
