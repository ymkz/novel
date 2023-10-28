import { NarouNovel } from "../../domain/narou";
import { NovelItem } from "./novel-item";

type Props = {
  narouNovelList: NarouNovel[];
};

export const NovelList = ({ narouNovelList }: Props) => {
  return (
    <ul class="list">
      {narouNovelList.map((narouNovel) => (
        <NovelItem narouNovel={narouNovel} />
      ))}
    </ul>
  );
};
