import { useQuery } from '@tanstack/react-query'
import { getNovelList } from '../api/novel'
import { List } from './mui-material'
import { NovelItem } from './novel-item'

export const NovelList = () => {
  const novelListQuery = useQuery({
    queryKey: ['NovelList'],
    queryFn: getNovelList,
  })

  return (
    <List>
      {novelListQuery.data?.map((novel) => (
        <NovelItem key={novel.ncode} novel={novel} />
      ))}
    </List>
  )
}
