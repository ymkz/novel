import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { NovelList } from "../../application/component/novel-list";
import { getNarouNovelList } from "../../application/service/narou";
import { deleteNovelItem } from "../../infrastructure/kv";

export const narouDelete = new Hono<AppEnv>().delete(
  zValidator(
    "param",
    z.object({
      ncode: z.string().min(1),
    }),
  ),
  async (ctx) => {
    const { ncode } = ctx.req.valid("param");

    await deleteNovelItem(ctx.env.KV, ncode);

    return ctx.body(null, {
      status: 204,
      headers: { "HX-Location": "/" },
    });
  },
);
