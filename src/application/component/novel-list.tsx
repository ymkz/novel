import { NovelItem } from '~/application/component/novel-item'
import { NarouNovel } from '~/domain/narou'

type Props = {
  narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
  return (
    <main id="main" class="p:8px|16px|32px">
      <ul class="flex flex-direction:column gap:24px">
        {narouNovelList.map((narouNovel) => (
          <NovelItem narouNovel={narouNovel} />
        ))}
      </ul>
    </main>
  )
}
