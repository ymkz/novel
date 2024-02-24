import { NovelItem } from '~/components/novel-item'
import { NarouNovel } from '~/domains/narou'

type Props = {
  narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
  return (
    <main>
      <ul class="p:8px|16px|32px flex flex-direction:column gap:24px">
        {narouNovelList.map((narouNovel) => (
          <NovelItem narouNovel={narouNovel} />
        ))}
      </ul>
    </main>
  )
}
