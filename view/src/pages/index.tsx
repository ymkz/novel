import { Header } from '../components/header'
import { Item } from '../components/item'
import { useNovelInfoQuery } from '../hooks/novel-info'

export const IndexPage = () => {
  const { data: novelData } = useNovelInfoQuery()
  return (
    <>
      <Header />
      <ul className="list">
        {novelData?.map((novelInfo) => (
          <Item key={novelInfo.ncode} novelInfo={novelInfo} />
        ))}
      </ul>
    </>
  )
}
