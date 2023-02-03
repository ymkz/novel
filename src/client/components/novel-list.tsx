import { FC } from 'react'
import { NovelItem } from './novel-item'

type NovelListProps = {
  novels: NarouItem[]
}

export const NovelList: FC<NovelListProps> = ({ novels }) => {
  return (
    <ul className="list">
      {novels.map((novel) => (
        <NovelItem key={novel.ncode} novel={novel} />
      ))}
    </ul>
  )
}
