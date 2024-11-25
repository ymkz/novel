import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getProxyNarouUrl } from '../../../server/domain/narou/helper'
import { getNovel, removeNovel } from '../../api/novel'
import { IconClose } from '../icon/close'
import { IconRemove } from '../icon/remove'

type Props = {
	ncode: string
	page: number
}

export const NovelViewer = ({ ncode, page = 0 }: Props) => {
	const query = useQuery({
		queryFn: () => getNovel(ncode),
		queryKey: ['novels', ncode],
	})

	const mutation = useMutation({
		mutationFn: removeNovel,
		onSuccess: () => {
			toast.success(`${ncode}を削除しました`)
			history.back()
		},
	})

	const handleClickRemove = () => {
		const removeConfirmed = confirm(`${ncode}を削除しますか？`)
		if (!removeConfirmed) return
		mutation.mutate(ncode)
	}

	const handleClickClose = () => {
		history.back()
	}

	return (
		<div className="viewer-container">
			<div className="viewer-header">
				<button className="viewer-icon__remove" type="button" onClick={handleClickRemove}>
					<IconRemove />
				</button>
				<div className="viewer-info">
					<p className="viewer-info__title">{query.data?.novel.title}</p>
					<p className="viewer-info__caption">{query.data?.novel.ncode}</p>
				</div>
				<button className="viewer-icon__close" type="button" onClick={handleClickClose}>
					<IconClose />
				</button>
			</div>
			<iframe
				title="narou-reader"
				style={{ width: '100%', height: '100%', border: 0 }}
				src={getProxyNarouUrl(ncode, page)}
				// src="https://wikipedia.org" // for debug
			/>
		</div>
	)
}
