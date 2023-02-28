import { useQuery } from '@tanstack/react-query'
import { getNovelList } from '../api/novel'
import { NovelItem } from './novel-item'

export const NovelList = () => {
  const novelListQuery = useQuery({
    queryKey: ['NovelList'],
    queryFn: getNovelList,
  })

  return (
    <ul className="novel-list">
      {novelListQuery.data?.map((novel) => (
        <NovelItem key={novel.ncode} novel={novel} />
      ))}
    </ul>
  )
}
