import { useRemoveNovelInfo } from '../hooks/novel-info'
import { NovelInfo } from '../types'
import { IconRemove } from './icon-remove'

type Props = {
  novelInfo: NovelInfo
}

export const Item = ({ novelInfo }: Props) => {
  const { mutate: removeNovelInfo } = useRemoveNovelInfo()

  const PROXY_URL = import.meta.env.PROD
    ? 'https://proxy.ymkz.app'
    : 'http://localhost:3002'

  const remove = () => {
    removeNovelInfo(novelInfo.ncode)
  }

  return (
    <li key={novelInfo.ncode} className="item">
      <div className="head">
        <div className="title">{novelInfo.title}</div>
        <button className="remove">
          <IconRemove width={18} height={18} onClick={remove} />
        </button>
      </div>
      <div className="episode">
        {`${novelInfo.currentPage}話` || '目次'}／全{novelInfo.totalPage}話
      </div>
      <a
        href={`${PROXY_URL}/${novelInfo.ncode}/${
          novelInfo.currentPage === 0 ? '' : novelInfo.currentPage
        }`}
        target="_blank"
        rel="noreferrer"
        className="anchor"
      />
    </li>
  )
}
