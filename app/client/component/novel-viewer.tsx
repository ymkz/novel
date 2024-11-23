import { useRoute } from 'wouter'
import { getProxyNarouUrl } from '../../server/domain/narou/helper'
import { IconClose } from './icon-close'

export const NovelViewer = () => {
	const [match, params] = useRoute('/narou/:ncode/:page?')

	if (!match) {
		return <div>404</div>
	}

	return (
		<div className="flex flex-col h-dvh w-[720px] mx-auto">
			<div className="flex flex-row">
				<IconClose />
			</div>
			<iframe
				title="narou-reader"
				style={{ width: '100%', height: '100%' }}
				className="border-0"
				src={getProxyNarouUrl(params.ncode, Number(params.page) || 0)}
			/>
			<div className="flex">footer</div>
		</div>
	)
}
