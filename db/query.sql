-- name: GetNarouNovel :one
SELECT * FROM narou
WHERE ncode = @ncode LIMIT 1;

-- name: ListNarouNovels :many
SELECT * FROM narou;
-- ORDER BY lastPublishedAt;

-- name: CreateNarouNovel :one
INSERT INTO narou (
  ncode, current_page
) VALUES (
  @ncode, @currentPage
)
RETURNING *;

-- name: UpdateNarouNovel :exec
UPDATE narou
set current_page = @currentPage
WHERE ncode = @ncode;

-- name: DeleteNarouNovel :exec
DELETE FROM narou
WHERE ncode = @ncode;
