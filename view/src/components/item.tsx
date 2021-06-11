import { NovelInfo } from '../types'
import { IconRemove } from './icon-remove'

type Props = {
  novelInfo: NovelInfo
  requestDelete: (id: NovelInfo['ncode']) => void
}

export const Item = ({ novelInfo, requestDelete }: Props) => {
  const PROXY_URL = import.meta.env.PROD
    ? 'https://proxy.ymkz.app'
    : 'http://localhost:3002'

  const handleRemove = () => {
    requestDelete(novelInfo.ncode)
  }

  return (
    <li key={novelInfo.ncode} className="item">
      <div className="head">
        <div className="title">{novelInfo.title}</div>
        <button className="remove">
          <IconRemove width={18} height={18} onClick={handleRemove} />
        </button>
      </div>
      <div className="episode">
        {`${novelInfo.currentPage}話` || '目次'}／全{novelInfo.totalPage}話
      </div>
      <a
        href={`${PROXY_URL}/${novelInfo.ncode}/${novelInfo.currentPage}`}
        target="_blank"
        rel="noreferrer"
        className="anchor"
      />
    </li>
  )
}
