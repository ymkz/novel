import { Drawer } from 'vaul'
import { getProxyNarouUrl } from '../../server/domain/narou/helper'
import { useNovelStore } from '../store/novel'

export const NovelViewer = () => {
	const novel = useNovelStore((state) => state.novel)

	return (
		<Drawer.Portal>
			<Drawer.Overlay />
			<Drawer.Content>
				<Drawer.Handle />
				<Drawer.Title>{novel?.title}</Drawer.Title>
				<Drawer.Description />
				<div className="view-content">
					{novel ? (
						<iframe
							title="iframe"
							style={{ width: '100%', height: '100%', border: 0 }}
							src={getProxyNarouUrl(novel.ncode, novel.currentPage)}
						/>
					) : null}
				</div>
			</Drawer.Content>
			<Drawer.Overlay />
		</Drawer.Portal>
	)
}
