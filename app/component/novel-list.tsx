import { NovelItem } from '~/component/novel-item'
import type { NarouNovel } from '~/domain/narou'

type Props = {
	narouNovelList: NarouNovel[]
}

export const NovelList = ({ narouNovelList }: Props) => {
	return (
		<div class="list-container">
			{narouNovelList.map((narouNovel) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: hono/jsx not need key
				<NovelItem narouNovel={narouNovel} />
			))}
		</div>
	)
}
