import dayjs from 'dayjs'

export function toUnixTime(
  generalLastup: NarouApiResponseNovelData['general_lastup']
): number {
  return dayjs(generalLastup).unix()
}

export function toDisplayTime(
  lastPublishedAt: NarouInfo['lastPublishedAt']
): string {
  return dayjs.unix(lastPublishedAt).format('YYYY年M月D日H時m分')
}
