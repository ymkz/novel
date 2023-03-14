import { useQuery } from '@tanstack/react-query'
import { getNovelList } from '../api/novel'
import { List } from './mui-material'
import { NovelItem } from './novel-item'

export const NovelList = () => {
  // FIXME: 本来は型を明示しなくてもhonoのRPCで型がつく
  // FIXME: 現状配列の型情報が失われるようなので明示的に型情報のパッチを行う
  const novelListQuery = useQuery<unknown, unknown, Novel[]>({
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
