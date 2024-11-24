import { useQuery } from '@tanstack/react-query'
import { listNovels } from '../../api/novel'
import { NovelInput } from '../novel-input'
import { NovelItem } from '../novel-item'
import style from './style.module.css'

export const NovelList = () => {
	const query = useQuery({
		queryFn: listNovels,
		queryKey: ['novels'],
	})

	return (
		<div className={style.container}>
			<NovelInput />
			<div className={style.list}>
				{query.data?.novels.map((novel) => (
					<NovelItem key={novel.ncode} novel={novel} />
				))}
			</div>
		</div>
	)
}
