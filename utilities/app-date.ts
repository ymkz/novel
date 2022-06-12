import dayjs from 'dayjs'

export { dayjs }

export function toDisplayTime(
  lastPublishedAt: NovelFromNarouApi['lastPublishedAt']
) {
  return dayjs.unix(lastPublishedAt).format('YYYY年M月D日H時m分')
}
