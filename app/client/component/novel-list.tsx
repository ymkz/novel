import { useQuery } from '@tanstack/react-query'
import { listNovels } from '../api/novel'
import { NovelInput } from './novel-input'
import { NovelItem } from './novel-item'

export const NovelList = () => {
	const query = useQuery({
		queryFn: listNovels,
		queryKey: ['novels'],
	})

	return (
		<div className="flex flex-col gap-6 max-w-[720px] mx-auto p-4">
			<NovelInput />
			<div className="flex flex-col gap-6">
				{query.data?.novels.map((novel) => (
					<NovelItem key={novel.ncode} novel={novel} />
				))}
			</div>
		</div>
	)
}
