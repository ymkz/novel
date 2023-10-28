import { Hono } from "hono";
import { NovelForm } from "../../application/component/novel-form";
import { NovelList } from "../../application/component/novel-list";
import { getNarouNovelList } from "../../application/service/narou";

export const indexPage = new Hono<AppEnv>().get(async (ctx) => {
  const narouNovelList = await getNarouNovelList(
    ctx.env.KV,
    ctx.req.header("user-agent") ?? "",
  );

  return ctx.render(
    <>
      <header class="header">
        <NovelForm />
      </header>
      <main class="main">
        <NovelList narouNovelList={narouNovelList} />
      </main>
    </>,
  );
});
