import { Drawer } from 'vaul'
import { getProxyNarouUrl } from '../../server/domain/narou/helper'
import { useNovelStore } from '../store/novel'

export const NovelViewer = () => {
	const novel = useNovelStore((state) => state.novel)

	return (
		<Drawer.Portal>
			<Drawer.Overlay className="view-overlay" />
			<Drawer.Content className="view-content">
				<Drawer.Handle className="view-handle" />
				<Drawer.Title />
				<Drawer.Description />
				<div className="view-body">
					{novel ? (
						<iframe
							title="iframe"
							style={{ width: '100%', height: '100%' }}
							className="view-iframe"
							// src="https://ja.wikipedia.org/wiki"
							src={getProxyNarouUrl(novel.ncode, novel.currentPage)}
						/>
					) : null}
				</div>
			</Drawer.Content>
			<Drawer.Overlay />
		</Drawer.Portal>
	)
}
