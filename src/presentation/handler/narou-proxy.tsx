import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getOriginalNarouUrl, getProxiedNarouUrl } from "~/domain/string";
import { updateNovelItem } from "~/infrastructure/kv";

const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute("href");
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split("/");
        element.setAttribute(
          "href",
          attribute.replace(/^\/n.+/, getProxiedNarouUrl(ncode, page)),
        );
      }
    }
  },
};

export const narouProxy = new Hono<AppEnv>().get(
  zValidator(
    "param",
    z.object({
      ncode: z.string().min(1),
      page: z.string().optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid("param");

    await updateNovelItem(ctx.env.KV, {
      ncode,
      currentPage: Number(page) || 0,
    });

    const url = getOriginalNarouUrl(ncode, page);

    const proxiedResponse = await fetch(url, {
      headers: { "user-agent": ctx.req.header("user-agent") ?? "" },
    });

    const response = new HTMLRewriter()
      .on("a", narouLinkReplacer)
      .transform(proxiedResponse);

    return response;
  },
);
