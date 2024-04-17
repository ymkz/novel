import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const narou = sqliteTable('narou', {
  ncode: text('ncode').primaryKey(),
  currentPage: integer('current_page', { mode: 'number' }).notNull(),
})

export const schema = {
  narou,
}
