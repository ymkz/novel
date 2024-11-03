# novel

## Tasks

### clean

```sh
find . -name '.wrangler' -type d -prune -exec rm -rf '{}' +
find . -name 'dist' -type d -prune -exec rm -rf '{}' +
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
find . -name 'pnpm-lock.yaml' -type f -prune -exec rm -rf '{}' +
find . -name 'tsconfig.tsbuildinfo' -type f -prune -exec rm -rf '{}' +
```

### setup

setup local d1 database

```sh
nlx wrangler d1 execute novels --local --file=database/0001_create_novels_table.sql
nlx wrangler d1 execute novels --local --file=database/0002_seed_novels_data.sql
```
