import { getProxyNarouUrl } from '~/domain/string'

type Props = {
  ncode: string
  page?: number
}

export const ViewerContent = ({ ncode, page }: Props) => {
  return (
    <div class="flex-grow:1">
      <iframe
        title="iframe"
        style={{ width: '100%', height: '100%', border: 0 }}
        src={getProxyNarouUrl(ncode, page)}
      />
    </div>
  )
}
