import { eq } from 'drizzle-orm'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { narou } from '~/datasource/d1/schema/narou'

export const narouRepository = {
  list: async (db: DrizzleD1Database) => {
    const result = await db.select().from(narou)
    return result
  },
  find: async (db: DrizzleD1Database, ncode: string) => {
    const result = await db.select().from(narou).where(eq(narou.ncode, ncode)).limit(1)
    return !result.length ? undefined : result[0]
  },
  create: async (db: DrizzleD1Database, ncode: string, currentPage: number) => {
    const result = await db.insert(narou).values({ ncode, currentPage })
    console.debug({ result, msg: 'insert result' })
  },
  update: async (db: DrizzleD1Database, ncode: string, currentPage: number) => {
    const result = await db
      .update(narou)
      .set({ currentPage: currentPage })
      .where(eq(narou.ncode, ncode))
    console.debug({ result, msg: 'update result' })
  },
  remove: async (db: DrizzleD1Database, ncode: string) => {
    const result = await db.delete(narou).where(eq(narou.ncode, ncode))
    console.debug({ result, msg: 'remove result' })
  },
}
