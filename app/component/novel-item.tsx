import type { NarouNovel } from '~/domain/narou'
import { getOriginalNarouUrl, getPageInfo, getViewerNarouUrl } from '~/domain/narou'

type Props = {
	narouNovel: NarouNovel
}

export const NovelItem = ({ narouNovel }: Props) => {
	return (
		<a class="list-item" href={getViewerNarouUrl(narouNovel.ncode, narouNovel.currentPage)}>
			<p class="title">{narouNovel.title}</p>
			<div>
				<p class="text">{getPageInfo(narouNovel.currentPage, narouNovel.totalPage)}</p>
				<p class="text">{narouNovel.lastPublishedAt}</p>
				<p class="text">{getOriginalNarouUrl(narouNovel.ncode, narouNovel.currentPage)}</p>
			</div>
		</a>
	)
}
