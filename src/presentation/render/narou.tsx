import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getProxiedNarouUrl } from "../../domain/stringify";

export const narouPage = new Hono<AppEnv>().get(
  zValidator(
    "param",
    z.object({
      ncode: z.string().min(1),
      page: z.string().optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid("param");

    return ctx.render(
      <div class="viewer-container">
        <div class="viewer-header">
          <a
            hx-delete={`/api/narou/delete/${ncode}`}
            href="/"
            class="viewer-delete"
          >
            削除
          </a>
          <a href="/" class="viewer-close">
            閉じる
          </a>
        </div>
        <div class="viewer-content">
          <iframe
            title="iframe"
            style={{ width: "100%", height: "100%", border: 0 }}
            src={getProxiedNarouUrl(ncode, page)}
          />
        </div>
      </div>,
    );
  },
);
