import { Link } from 'wouter'
import { getNarouViewerUrl, getOriginalNarouUrl, getPageInfo } from '../../../server/domain/narou/helper'
import type { NarouNovel } from '../../../server/domain/narou/model'
import style from './style.module.css'

type Props = {
	novel: NarouNovel
}

export const NovelItem = ({ novel }: Props) => {
	return (
		<Link className={style.link} href={getNarouViewerUrl(novel.ncode, novel.currentPage)}>
			<p className={style.title}>{novel.title}</p>
			<div className={style.infoContainer}>
				<p className={style.infoLabel}>{getPageInfo(novel.currentPage, novel.totalPage)}</p>
				<p className={style.infoLabel}>{novel.lastPublishedAt}</p>
				<p className={style.infoLabel}>{getOriginalNarouUrl(novel.ncode, novel.currentPage)}</p>
			</div>
		</Link>
	)
}
