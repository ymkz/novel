import { trpc } from '../../util/trpc'
import { NovelInput } from '../components/novel-input'
import { NovelList } from '../components/novel-list'

export const IndexPage = () => {
  const novel = trpc.novel.list.useQuery()

  if (!novel.data) {
    return null
  }

  // TODO: 要素が空の場合のコンポーネントを用意したい
  // if (!novel.data.novels.length) {
  //   return <Empty />
  // }

  return (
    <>
      <NovelInput />
      <NovelList novels={novel.data.novels} />
    </>
  )
}
