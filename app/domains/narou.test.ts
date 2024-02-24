import { describe, expect, test } from 'vitest'
import {
  getLastPublishedAt,
  getOriginalNarouUrl,
  getPageInfo,
  getProxyNarouUrl,
  getViewerNarouUrl,
  parseNcodeAndPage,
} from '~/domains/narou'

describe('parseNcodeAndPage', () => {
  test.each([
    { url: 'https://ncode.syosetu.com/n1234/10/', expected: { ncode: 'n1234', page: 10 } },
    { url: 'https://ncode.syosetu.com/n1234/10', expected: { ncode: 'n1234', page: 10 } },
    { url: 'https://ncode.syosetu.com/n1234/', expected: { ncode: 'n1234', page: 0 } },
    { url: 'https://ncode.syosetu.com/n1234', expected: { ncode: 'n1234', page: 0 } },
  ])('parseNcodeAndPage($url) -> $expected', ({ url, expected }) => {
    expect(parseNcodeAndPage(url)).toStrictEqual(expected)
  })
})

describe('getLastPublishedAt', () => {
  test.each([
    { datetime: '2024-01-01 12:34:56', expected: '2024年1月1日12時34分' },
    { datetime: '2016-12-31 23:59:59', expected: '2016年12月31日23時59分' },
  ])('getLastPublishedAt($datetime) -> $expected', ({ datetime, expected }) => {
    expect(getLastPublishedAt(datetime)).toStrictEqual(expected)
  })
})

describe('getViewerNarouUrl', () => {
  test.each([
    { ncode: 'n1234', page: 1, expected: '/viewer/narou/n1234/1' },
    { ncode: 'n1234', page: 0, expected: '/viewer/narou/n1234/0' },
  ])('getViewerNarouUrl($ncode, $page) -> $expected', ({ ncode, page, expected }) => {
    expect(getViewerNarouUrl(ncode, page)).toStrictEqual(expected)
  })
})

describe('getProxyNarouUrl', () => {
  test.each([
    { ncode: 'n1234', page: 1, expected: '/proxy/narou/n1234/1' },
    { ncode: 'n1234', page: 0, expected: '/proxy/narou/n1234/0' },
  ])('getProxyNarouUrl($ncode, $page) -> $expected', ({ ncode, page, expected }) => {
    expect(getProxyNarouUrl(ncode, page)).toStrictEqual(expected)
  })
})

describe('getOriginalNarouUrl', () => {
  test.each([
    { ncode: 'n1234', page: 1, expected: 'https://ncode.syosetu.com/n1234/1' },
    { ncode: 'n1234', page: 0, expected: 'https://ncode.syosetu.com/n1234' },
  ])('getOriginalNarouUrl($ncode, $page) -> $expected', ({ ncode, page, expected }) => {
    expect(getOriginalNarouUrl(ncode, page)).toStrictEqual(expected)
  })
})

describe('getPageInfo', () => {
  test.each([
    { currentPage: 1, totalPage: 10, expected: '1話／全10話' },
    { currentPage: 0, totalPage: 10, expected: '0話／全10話' },
  ])(
    'getPageInfo($currentPage, $totalPage) -> $expected',
    ({ currentPage, totalPage, expected }) => {
      expect(getPageInfo(currentPage, totalPage)).toStrictEqual(expected)
    },
  )
})
