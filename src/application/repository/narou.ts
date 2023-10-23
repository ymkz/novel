import { makeLastPublishedAt } from "../../domain/stringify";
import { fetchNarouApi } from "../../infrastructure/narou";

type NarouInfo = {
  ncode: string;
  title: string;
  totalPage: number;
  lastPublishedAt: string;
};

type NarouApiResponseAllCount = {
  allcount: number;
};

type NarouApiResponseNovelData = {
  title: string;
  ncode: string;
  userid: number;
  writer: string;
  story: string;
  biggenre: number;
  genre: number;
  gensaku: string;
  keyword: string;
  general_firstup: string;
  general_lastup: string;
  novel_type: number;
  end: number;
  general_all_no: number;
  length: number;
  time: number;
  isstop: number;
  isr15: number;
  isbl: number;
  isgl: number;
  iszankoku: number;
  istensei: number;
  istenni: number;
  pc_or_k: number;
  global_point: number;
  daily_point: number;
  weekly_point: number;
  monthly_point: number;
  quarter_point: number;
  yearly_point: number;
  fav_novel_cnt: number;
  impression_cnt: number;
  review_cnt: number;
  all_point: number;
  all_hyoka_cnt: number;
  sasie_cnt: number;
  kaiwaritu: number;
  novelupdated_at: string;
  updated_at: string;
};

export type NarouApiResponse = [
  NarouApiResponseAllCount,
  ...NarouApiResponseNovelData[],
];

export async function getNarouInfo(
  ncode: string,
  userAgent: string,
): Promise<NarouInfo[]> {
  const [, ...data] = await fetchNarouApi(ncode, userAgent);

  const narouInfoList = data
    .map<NarouInfo>((item) => ({
      ncode: item.ncode.toLocaleLowerCase(),
      title: item.title,
      totalPage: item.general_all_no,
      lastPublishedAt: makeLastPublishedAt(item.general_lastup),
    }))
    .sort((a, b) => (a.lastPublishedAt < b.lastPublishedAt ? 1 : -1));

  return narouInfoList;
}
