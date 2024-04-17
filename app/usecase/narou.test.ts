import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { describe, expect, test, vi } from 'vitest'
import * as narouApi from '~/datasource/api/narou'
import { narouRepository } from '~/datasource/d1/narou'
import { addNarouNovel, listNarouNovel, removeNarouNovel, updateNarouNovel } from '~/usecase/narou'

// @ts-ignore
const db: DrizzleD1Database = 'drizzle_d1_database'

describe.skip('listNarouNovel', () => {
  test('データがない場合、空配列が返されること', async () => {
    const spyRepositoryListAll = vi.spyOn(narouRepository, 'list').mockResolvedValue([])

    expect(await listNarouNovel(db, 'userAgent')).toStrictEqual([])
    expect(spyRepositoryListAll).toHaveBeenCalledTimes(1)
    expect(spyRepositoryListAll).toHaveBeenCalledWith(db)
  })

  test('データがある場合、一覧の配列が取得できること', async () => {
    const spyRepositoryListAll = vi.spyOn(narouRepository, 'list').mockResolvedValue([
      { ncode: 'n0000zz', currentPage: 1 },
      { ncode: 'n1111zz', currentPage: 0 },
    ])
    const spyFetchNarouApi = vi
      .spyOn(narouApi, 'fetchNarouApi')
      // @ts-ignore
      .mockResolvedValue([
        { allcount: 2 },
        {
          ncode: 'n0000zz',
          title: 'title0000',
          general_all_no: 10,
          general_lastup: '2024-01-01 00:00:00',
        },
        {
          ncode: 'n1111zz',
          title: 'title1111',
          general_all_no: 10,
          general_lastup: '2024-01-01 00:00:00',
        },
      ])

    expect(await listNarouNovel(db, 'userAgent')).toStrictEqual([
      {
        ncode: 'n0000zz',
        title: 'title0000',
        currentPage: 1,
        totalPage: 10,
        lastPublishedAt: '2024年1月1日0時0分',
      },
      {
        ncode: 'n1111zz',
        title: 'title1111',
        currentPage: 0,
        totalPage: 10,
        lastPublishedAt: '2024年1月1日0時0分',
      },
    ])
    expect(spyRepositoryListAll).toHaveBeenCalledTimes(1)
    expect(spyRepositoryListAll).toHaveBeenCalledWith(db)
    expect(spyFetchNarouApi).toHaveBeenCalledTimes(1)
    expect(spyFetchNarouApi).toHaveBeenCalledWith('n0000zz-n1111zz', 'userAgent')
  })
})

describe('addNarouNovel', () => {
  test('新規に追加する小説ではなくページが同じ場合、処理をスキップする', async () => {
    const spyRepositoryGetOne = vi
      .spyOn(narouRepository, 'find')
      .mockResolvedValue({ ncode: 'n0000zz', currentPage: 1 })

    expect(await addNarouNovel(db, 'https://ncode.syosetu.com/n0000zz/1')).toBe(
      'n0000zz/1は重複のためスキップしました',
    )
    expect(spyRepositoryGetOne).toHaveBeenCalledTimes(1)
    expect(spyRepositoryGetOne).toHaveBeenCalledWith(db, 'n0000zz')
  })

  test('新規に追加する小説ではなくページが異なる場合、ページを更新する', async () => {
    const spyRepositoryGetOne = vi
      .spyOn(narouRepository, 'find')
      .mockResolvedValue({ ncode: 'n0000zz', currentPage: 1 })
    const spyRepositoryUpdate = vi.spyOn(narouRepository, 'update').mockResolvedValue()

    expect(await addNarouNovel(db, 'https://ncode.syosetu.com/n0000zz/2')).toBe(
      'n0000zzはページを2で更新しました',
    )
    expect(spyRepositoryGetOne).toHaveBeenCalledTimes(1)
    expect(spyRepositoryGetOne).toHaveBeenCalledWith(db, 'n0000zz')
    expect(spyRepositoryUpdate).toHaveBeenCalledTimes(1)
    expect(spyRepositoryUpdate).toHaveBeenCalledWith(db, 'n0000zz', 2)
  })

  test('新規に追加する小説の場合', async () => {
    const spyRepositoryGetOne = vi.spyOn(narouRepository, 'find').mockResolvedValue(undefined)
    const spyRepositoryInsert = vi.spyOn(narouRepository, 'create').mockResolvedValue()

    expect(await addNarouNovel(db, 'https://ncode.syosetu.com/n0000zz/1')).toBe(
      'n0000zz/1が新しく追加されました',
    )
    expect(spyRepositoryGetOne).toHaveBeenCalledTimes(1)
    expect(spyRepositoryGetOne).toHaveBeenCalledWith(db, 'n0000zz')
    expect(spyRepositoryInsert).toHaveBeenCalledTimes(1)
    expect(spyRepositoryInsert).toHaveBeenCalledWith(db, 'n0000zz', 1)
  })
})

describe('removeNarouNovel', () => {
  test('なろう小説が削除されること', async () => {
    const spyRepositoryRemove = vi.spyOn(narouRepository, 'remove').mockResolvedValue()

    expect(await removeNarouNovel(db, 'n0000zz')).toBeUndefined()
    expect(spyRepositoryRemove).toHaveBeenCalledTimes(1)
    expect(spyRepositoryRemove).toHaveBeenCalledWith(db, 'n0000zz')
  })
})

describe('updateNarouNovel', () => {
  test('なろう小説が更新されること', async () => {
    const spyRepositoryUpdate = vi.spyOn(narouRepository, 'update').mockResolvedValue()

    expect(await updateNarouNovel(db, 'n0000zz', 0)).toBeUndefined()
    expect(spyRepositoryUpdate).toHaveBeenCalledTimes(1)
    expect(spyRepositoryUpdate).toHaveBeenCalledWith(db, 'n0000zz', 0)
  })
})
