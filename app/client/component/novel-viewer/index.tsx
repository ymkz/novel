import { Link, useRoute } from 'wouter'
import { getProxyNarouUrl } from '../../../server/domain/narou/helper'
import { IconClose } from '../icon/close'
import { IconRemove } from '../icon/remove'

export const NovelViewer = () => {
	const [match, params] = useRoute('/narou/:ncode/:page?')

	if (!match) {
		return <div>404</div>
	}

	return (
		<div className="viewer-container">
			<div className="viewer-header">
				<IconRemove className="viewer-icon__remove" />
				<Link href="/">
					<IconClose className="viewer-icon__close" />
				</Link>
			</div>
			<iframe
				title="narou-reader"
				style={{ width: '100%', height: '100%', border: 0 }}
				// src="https://wikipedia.org" // for debug
				src={getProxyNarouUrl(params.ncode, Number(params.page) || 0)}
			/>
		</div>
	)
}
