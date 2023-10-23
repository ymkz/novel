import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { NovelList } from "../../application/component/novel-list";
import {
	addNarouNovel,
	getNarouNovelList,
} from "../../application/service/narou";

export const narouAdd = new Hono<AppEnv>().post(
	zValidator(
		"form",
		z.object({
			url: z.string().min(1).url(),
		}),
	),
	async (ctx) => {
		const { url } = ctx.req.valid("form");

		await addNarouNovel(ctx.env.KV, url);

		const userAgent = ctx.req.header("user-agent") ?? "";
		const narouNovelList = await getNarouNovelList(ctx.env.KV, userAgent);

		return ctx.html(<NovelList narouNovelList={narouNovelList} />);
	},
);
