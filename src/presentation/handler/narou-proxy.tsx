import { Hono } from "hono";
import { updateNovelItem } from "../../infrastructure/kv";

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute("href");
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split("/");
        element.setAttribute(
          "href",
          attribute.replace(/^\/n.+/, `/proxy/narou/${ncode}/${page}`),
        );
      }
    }
  },
};

export const narouProxy = new Hono<AppEnv>().get(
  "/:ncode/:page?",
  async (ctx) => {
    const { ncode, page } = ctx.req.param();

    await updateNovelItem(ctx.env.KV, {
      ncode,
      currentPage: Number(page) || 0,
    });

    const userAgent = ctx.req.header("user-agent") ?? "";
    const url = page
      ? `https://ncode.syosetu.com/${ncode}/${page}`
      : `https://ncode.syosetu.com/${ncode}`;

    const proxiedResponse = await fetch(url, {
      headers: { "user-agent": userAgent },
    });

    const response = new HTMLRewriter()
      .on("a", narouLinkReplacer)
      .transform(proxiedResponse);

    return response;
  },
);
