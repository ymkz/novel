import { NarouNovel } from '~/domain/narou'
import { getOriginalNarouUrl, getPageInfo, getViewerNarouUrl } from '~/domain/string'

type Props = {
  narouNovel: NarouNovel
}

export const NovelItem = ({ narouNovel }: Props) => {
  return (
    <li>
      <a
        class="flex flex-direction:column gap:8px"
        href={getViewerNarouUrl(narouNovel.ncode, narouNovel.currentPage)}
      >
        <p class="font-family:sans font-weight:700 font-size:17px line-height:1.3 color:fade-4">
          {narouNovel.title}
        </p>
        <div>
          <p class="font-family:sans font-weight:400 font-size:11px line-height:1.3 color:fade-40">
            {getPageInfo(narouNovel.currentPage, narouNovel.totalPage)}
          </p>
          <p class="font-family:sans font-weight:400 font-size:11px line-height:1.3 color:fade-40">
            {narouNovel.lastPublishedAt}
          </p>
          <p class="font-family:sans font-weight:400 font-size:11px line-height:1.3 color:fade-40">
            {getOriginalNarouUrl(narouNovel.ncode)}
          </p>
        </div>
      </a>
    </li>
  )
}
