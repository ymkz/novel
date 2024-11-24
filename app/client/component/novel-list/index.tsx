import { useQuery } from '@tanstack/react-query'
import { listNovels } from '../../api/novel'
import { NovelInput } from '../novel-input'
import { NovelItem } from '../novel-item'

export const NovelList = () => {
	const query = useQuery({
		queryFn: listNovels,
		queryKey: ['novels'],
	})

	return (
		<div className="list-container">
			<NovelInput />
			<div className="list">
				{query.data?.novels.map((novel) => (
					<NovelItem key={novel.ncode} novel={novel} />
				))}
			</div>
		</div>
	)
}
