import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import type { Logger } from 'drizzle-orm/logger'
import { narou, schema } from '~/datasource/d1/schema'

class DrizzleD1Logger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.info({ query, params, msg: 'd1 sql executed' })
  }
}

const logger = new DrizzleD1Logger()

export const listAll = async (d1: D1Database) => {
  const db = drizzle(d1, { logger })
  const result = await db.select().from(narou)
  return result
}

type GetNarouNovelParams = {
  ncode: string
}
export const getOne = async (d1: D1Database, params: GetNarouNovelParams) => {
  const db = drizzle(d1, { schema, logger })
  const result = await db.select().from(narou).where(eq(narou.ncode, params.ncode)).limit(1)
  return !result.length ? undefined : result[0]
}

type CreateNarouNovelParams = {
  ncode: string
  currentPage: number
}
export const insert = async (d1: D1Database, params: CreateNarouNovelParams) => {
  const db = drizzle(d1, { schema, logger })
  const result = await db.insert(narou).values(params)
  console.debug({ result, msg: 'insert result' })
}

type DeleteNarouNovelParams = {
  ncode: string
}
export const remove = async (d1: D1Database, params: DeleteNarouNovelParams) => {
  const db = drizzle(d1, { schema, logger })
  const result = await db.delete(narou).where(eq(narou.ncode, params.ncode))
  console.debug({ result, msg: 'remove result' })
}

type UpdateNarouNovelParams = {
  ncode: string
  currentPage: number
}
export const update = async (d1: D1Database, params: UpdateNarouNovelParams) => {
  const db = drizzle(d1, { schema, logger })
  const result = await db
    .update(narou)
    .set({ currentPage: params.currentPage })
    .where(eq(narou.ncode, params.ncode))
  console.debug({ result, msg: 'update result' })
}
