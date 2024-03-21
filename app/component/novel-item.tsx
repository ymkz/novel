import { css } from 'hono/css'
import type { NarouNovel } from '~/domain/narou'
import { getOriginalNarouUrl, getPageInfo, getViewerNarouUrl } from '~/domain/narou'

type Props = {
  narouNovel: NarouNovel
}

export const NovelItem = ({ narouNovel }: Props) => {
  const containerStyle = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `
  const titleStyle = css`
    font-family: sans;
    font-weight: 700;
    font-size: 17px;
    line-height: 1.3;
    color: #24262d;
  `
  const textStyle = css`
  font-family: sans;
  font-weight: 400;
  font-size: 11px;
  color: #4c515f;
`

  return (
    <li>
      <a class={containerStyle} href={getViewerNarouUrl(narouNovel.ncode, narouNovel.currentPage)}>
        <p class={titleStyle}>{narouNovel.title}</p>
        <div>
          <p class={textStyle}>{getPageInfo(narouNovel.currentPage, narouNovel.totalPage)}</p>
          <p class={textStyle}>{narouNovel.lastPublishedAt}</p>
          <p class={textStyle}>{getOriginalNarouUrl(narouNovel.ncode, narouNovel.currentPage)}</p>
        </div>
      </a>
    </li>
  )
}
