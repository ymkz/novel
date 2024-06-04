# novel

## How to setup local development

1. clone repository
1. `nci`
1. `npx drizzle-kit generate:sqlite`
1. `mkdir -p .wrangler/state/v3/d1/DB`
1. `sqlite3 .wrangler/state/v3/d1/DB/db.sqlite < db/migration/0000_broken_mystique.sql`
1. `sqlite3 .wrangler/state/v3/d1/DB/db.sqlite < db/seed/0000_insert_for_local.sql`
