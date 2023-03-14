import dayjs from 'dayjs'

/**
 * @example 2023-03-14 23:52:28 → 1678805548
 */
export const toUnixTime = (stringtime: string): number => {
  return dayjs(stringtime).unix()
}

/**
 * @example 1678805548 → 2023年3月14日23時52分
 */
export const toDisplayTime = (unixtime: number): string => {
  return dayjs.unix(unixtime).format('YYYY年M月D日H時m分')
}
