import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { NovelList } from "../../application/component/novel-list";
import { getNarouNovelList } from "../../application/service/narou";
import { deleteNovelItem } from "../../infrastructure/kv";

export const narouDelete = new Hono<AppEnv>().delete(
  zValidator(
    "form",
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid("form");

    await deleteNovelItem(ctx.env.KV, ncode);

    const userAgent = ctx.req.header("user-agent") ?? "";
    const narouNovelList = await getNarouNovelList(ctx.env.KV, userAgent);

    return ctx.html(<NovelList narouNovelList={narouNovelList} />);
  },
);
