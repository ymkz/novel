import { Drawer } from 'vaul'
import { getOriginalNarouUrl, getPageInfo } from '../../server/domain/narou/helper'
import type { NarouNovel } from '../../server/domain/narou/model'
import { useNovelStore } from '../store/novel'

type Props = {
	novel: NarouNovel
}

export const NovelItem = ({ novel }: Props) => {
	const openNovelViewer = useNovelStore((state) => state.openNovelViewer)

	const handleClick = () => {
		openNovelViewer(novel)
	}

	return (
		<Drawer.Trigger onClick={handleClick}>
			<div className="list-item">
				<p className="title">{novel.title}</p>
				<div>
					<p className="text">{getPageInfo(novel.currentPage, novel.totalPage)}</p>
					<p className="text">{novel.lastPublishedAt}</p>
					<p className="text">{getOriginalNarouUrl(novel.ncode, novel.currentPage)}</p>
				</div>
			</div>
		</Drawer.Trigger>
	)
}
