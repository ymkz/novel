import { NarouNovel } from "~/domain/narou";
import {
  getOriginalNarouUrl,
  getPageInfo,
  getViewerNarouUrl,
} from "~/domain/stringify";

type Props = {
  narouNovel: NarouNovel;
};

export const NovelItem = ({ narouNovel }: Props) => {
  return (
    <li class="item">
      <a
        class="link"
        href={getViewerNarouUrl(narouNovel.ncode, narouNovel.currentPage)}
      >
        <div class="title">{narouNovel.title}</div>
        <div class="info">
          <p class="page">
            {getPageInfo(narouNovel.currentPage, narouNovel.totalPage)}
          </p>
          <p class="lastPublishedAt">{narouNovel.lastPublishedAt}</p>
          <p class="url">{getOriginalNarouUrl(narouNovel.ncode)}</p>
        </div>
      </a>
    </li>
  );
};
