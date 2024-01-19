# novel

## presetup

```sh
mkdir -p .mf/d1/DB

sqlite3 .mf/d1/DB/db.sqlite < db/schema.sql
sqlite3 $(find .mf/d1/miniflare-D1DatabaseObject -name "*.sqlite") < db/schema.sql

sqlite3 .mf/d1/DB/db.sqlite < db/seed.sql
sqlite3 $(find .mf/d1/miniflare-D1DatabaseObject -name "*.sqlite") < db/seed.sql
```
