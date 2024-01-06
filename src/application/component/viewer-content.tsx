import { getProxiedNarouUrl } from '~/domain/string'

type Props = {
  ncode: string
  page?: string
}

export const ViewerContent = ({ ncode, page }: Props) => {
  return (
    <div class="flex-grow:1">
      <iframe
        title="iframe"
        style={{ width: '100%', height: '100%', border: 0 }}
        src={getProxiedNarouUrl(ncode, page)}
      />
    </div>
  )
}
