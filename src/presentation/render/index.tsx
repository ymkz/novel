import { Context } from "hono";
import { NovelForm } from "../../application/component/novel-form";
import { NovelList } from "../../application/component/novel-list";
import { getNarouNovelList } from "../../application/service/narou";

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
		</>,
	);
};
