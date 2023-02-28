import { NovelForm } from '../components/novel-form'
import { NovelList } from '../components/novel-list'
import { NovelViewer } from '../components/novel-viewer'

export const IndexPage = () => {
  return (
    <>
      <NovelForm />
      <NovelList />
      <NovelViewer />
    </>
  )
}
