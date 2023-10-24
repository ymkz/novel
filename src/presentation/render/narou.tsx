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

    return ctx.html(
      <div>
        <div>header</div>
        <iframe
          title="iframe"
          class="iframe"
          src={generateIframeSrc(ncode, currentPage)}
        />
      </div>,
    );
  },
);
