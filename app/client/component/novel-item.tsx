import { Link } from 'wouter'
import { getOriginalNarouUrl, getPageInfo, getProxyNarouUrl } from '../../server/domain/narou/helper'
import type { NarouNovel } from '../../server/domain/narou/model'

type Props = {
	novel: NarouNovel
}

export const NovelItem = ({ novel }: Props) => {
	return (
		<Link href={getProxyNarouUrl(novel.ncode, novel.currentPage)}>
			<div className="flex flex-col gap-2 cursor-pointer">
				<p className="font-bold text-base leading-snug">{novel.title}</p>
				<div className="flex flex-col gap-1">
					<p className="font-normal leading-none text-xs text-gray-600">
						{getPageInfo(novel.currentPage, novel.totalPage)}
					</p>
					<p className="font-normal leading-none text-xs text-gray-600">{novel.lastPublishedAt}</p>
					<p className="font-normal leading-none text-xs text-gray-600">
						{getOriginalNarouUrl(novel.ncode, novel.currentPage)}
					</p>
				</div>
			</div>
		</Link>
	)
}
