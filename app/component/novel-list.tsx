import { NovelItem } from '~/component/novel-item'
import type { NarouNovel } from '~/domain/narou'

type Props = {
  narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
  return (
    <div class="list-container">
      {narouNovelList.map((narouNovel) => (
        <NovelItem narouNovel={narouNovel} />
      ))}
    </div>
  )
}
