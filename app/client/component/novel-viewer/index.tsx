import { Link, useRoute } from 'wouter'
import { getProxyNarouUrl } from '../../../server/domain/narou/helper'
import { IconClose } from '../icon/close'
import style from './style.module.css'

export const NovelViewer = () => {
	const [match, params] = useRoute('/narou/:ncode/:page?')

	if (!match) {
		return <div>404</div>
	}

	return (
		<div className={style.container}>
			<div className={style.header}>
				<Link href="/">
					<IconClose />
				</Link>
			</div>
			<iframe
				title="narou-reader"
				style={{ width: '100%', height: '100%' }}
				className={style.iframe}
				src="https://wikipedia.org"
				// src={getProxyNarouUrl(params.ncode, Number(params.page) || 0)}
			/>
		</div>
	)
}
