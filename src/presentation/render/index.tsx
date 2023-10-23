import { Context } from "hono";
import { NovelForm } from "../../application/component/novel-form";
import { NovelList } from "../../application/component/novel-list";
import { getNarouNovelList } from "../../application/service/narou";
import { generateIframeSrc } from "../../domain/stringify";

export const page = async (ctx: Context) => {
  const userAgent = ctx.req.header("user-agent") ?? "";
  const narouNovelList = await getNarouNovelList(ctx.env.KV, userAgent);

  return ctx.render(
    <>
      <header class="header">
        <NovelForm />
      </header>
      <main class="main">
        <NovelList narouNovelList={narouNovelList} />
      </main>
      <iframe
        title="iframe"
        style={{ width: "100%", height: "100%", border: 0 }}
        src={generateIframeSrc(
          narouNovelList[0].ncode,
          narouNovelList[0].currentPage,
        )}
      />
    </>,
  );
};
