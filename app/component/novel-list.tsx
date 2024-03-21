import { css } from 'hono/css'
import { NovelItem } from '~/component/novel-item'
import type { NarouNovel } from '~/domain/narou'

type Props = {
  narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
  const style = css`
    padding: 8px 16px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `
  return (
    <main>
      <ul class={style}>
        {narouNovelList.map((narouNovel) => (
          <NovelItem narouNovel={narouNovel} />
        ))}
      </ul>
    </main>
  )
}
