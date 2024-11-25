import { Link } from 'wouter'
import { getNarouViewerUrl, getOriginalNarouUrl, getPageInfo } from '../../../server/domain/narou/helper'
import type { NarouNovel } from '../../../server/domain/narou/model'

type Props = {
	novel: NarouNovel
}

export const NovelItem = ({ novel }: Props) => {
	return (
		<Link className="item" href={getNarouViewerUrl(novel.ncode, novel.currentPage)}>
			<p className="item-title">{novel.title}</p>
			<div className="item-info">
				<p className="item-label">{getPageInfo(novel.currentPage, novel.totalPage)}</p>
				<p className="item-label">{novel.author}</p>
				<p className="item-label">{novel.lastPublishedAt}</p>
				<p className="item-label">{getOriginalNarouUrl(novel.ncode, novel.currentPage)}</p>
			</div>
		</Link>
	)
}
