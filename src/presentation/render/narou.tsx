import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { generateIframeSrc } from "../../domain/stringify";

export const narouPage = new Hono<AppEnv>().get(
  zValidator(
    "param",
    z.object({
      ncode: z.string().min(1),
      currentPage: z.string().optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, currentPage } = ctx.req.valid("param");

    return ctx.render(
      <div class="viewer-container">
        <div class="viewer-header">
          <a href="/" class="viewer-button--delete">
            削除
          </a>
          <a href="/" class="viewer-button--close">
            閉じる
          </a>
        </div>
        <div class="viewer-content">
          <iframe
            title="iframe"
            style={{ width: "100%", height: "100%", border: 0 }}
            src={generateIframeSrc(ncode, currentPage)}
          />
        </div>
      </div>,
    );
  },
);
