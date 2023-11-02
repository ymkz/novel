import { getNarouInfo } from "~/application/repository/narou";
import { NarouNovel } from "~/domain/narou";
import {
  addNovelItem,
  deleteNovelItem,
  getNovelData,
} from "~/infrastructure/kv";

export const getNarouNovelList = async (kv: KVNamespace, userAgent: string) => {
  const kvNovelList = await getNovelData(kv);

  if (kvNovelList.length === 0) {
    return [];
  }

  const ncodeList = kvNovelList.map((novel) => novel.ncode).join("-");
  const narouInfoList = await getNarouInfo(ncodeList, userAgent);
  const narouNovelList = narouInfoList.map<NarouNovel>((narouInfo) => ({
    ...narouInfo,
    currentPage:
      kvNovelList.find((kvNovelItem) => kvNovelItem.ncode === narouInfo.ncode)
        ?.currentPage ?? 0,
  }));

  return narouNovelList;
};

export const addNarouNovel = async (kv: KVNamespace, url: string) => {
  const [, ncode, currentPage] = new URL(url).pathname.split("/");

  await addNovelItem(kv, {
    ncode,
    currentPage: Number(currentPage) || 0,
  });
};

export const deleteNarouNovel = async (kv: KVNamespace, ncode: string) => {
  await deleteNovelItem(kv, ncode);
};
