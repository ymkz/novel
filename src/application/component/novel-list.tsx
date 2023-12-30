import { NovelItem } from '~/application/component/novel-item'
import { NarouNovel } from '~/domain/narou'

type Props = {
  narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
  return (
    <ul class="flex flex-direction:column gap:24px">
      {narouNovelList.map((narouNovel) => (
        <NovelItem narouNovel={narouNovel} />
      ))}
    </ul>
  )
}
