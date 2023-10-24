import { NarouNovel } from "../../domain/narou";
import {
  generateNarouHref,
  generateNcodeCaption,
  generatePageInfo,
} from "../../domain/stringify";

type Props = {
  narouNovel: NarouNovel;
};

export const NovelItem = ({ narouNovel }: Props) => {
  return (
    <li class="item">
      {/* biome-ignore lint/a11y/useAnchorContent: <explanation> */}
      <a
        class="link"
        href={generateNarouHref(narouNovel.ncode, narouNovel.currentPage)}
      />
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
