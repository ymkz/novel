import { NarouNovel } from "../../domain/narou";
import {
	generateIframeSrc,
	generateNcodeCaption,
	generatePageInfo,
} from "../../domain/stringify";

type Props = {
	narouNovel: NarouNovel;
};

export const NovelItem = ({ narouNovel }: Props) => {
	return (
		<li
			class="item"
			hx-get={generateIframeSrc(narouNovel.ncode, narouNovel.currentPage)}
		>
			<div class="title">{narouNovel.title}</div>
			<div class="info">
				<p class="page">
					{generatePageInfo(narouNovel.currentPage, narouNovel.totalPage)}
				</p>
				<p class="lastPublishedAt">{narouNovel.lastPublishedAt}</p>
				<p class="url">{generateNcodeCaption(narouNovel.ncode)}</p>
			</div>
		</li>
	);
};
