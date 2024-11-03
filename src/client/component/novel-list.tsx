import { useQuery } from '@tanstack/react-query'
import { listNovels } from '../api/novel'
import { NovelItem } from './novel-item'

export const NovelList = () => {
	const query = useQuery({
		queryFn: listNovels,
		queryKey: ['novels'],
	})

	return (
		<div className="list-container">
			{query.data?.novels.map((novel) => (
				<NovelItem key={novel.ncode} novel={novel} />
			))}
		</div>
	)
}
