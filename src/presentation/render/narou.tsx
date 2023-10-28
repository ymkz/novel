import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { generateIframeSrc } from "../../domain/stringify";

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
          <button
            hx-delete={`/api/narou/delete/${ncode}`}
            hx-target=".main"
            class="viewer-button--delete"
            type="button"
          >
            削除
          </button>
          <a href="/" class="viewer-button--close">
            閉じる
          </a>
        </div>
        <div class="viewer-content">
          <iframe
            title="iframe"
            style={{ width: "100%", height: "100%", border: 0 }}
            src={generateIframeSrc(ncode, page)}
          />
        </div>
      </div>,
    );
  },
);
