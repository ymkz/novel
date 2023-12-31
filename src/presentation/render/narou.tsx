import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { getProxiedNarouUrl } from '~/domain/string'

export const narouViewer = new Hono<AppEnv>().get(
  zValidator(
    'param',
    z.object({
      ncode: z.string().min(1),
      page: z.string().optional(),
    }),
  ),
  async (ctx) => {
    const { ncode, page } = ctx.req.valid('param')

    return ctx.render(
      <div class="max-w:720px mx:auto flex flex-direction:column height:100dvh">
        <div class="flex justify-content:space-between align-items:center height:32px px:8px">
          <form hx-delete="/api/narou" hx-trigger="click">
            <span class="font-family:sans font-weight:400 font-size:11px color:red-50">削除</span>
            <input name="ncode" type="hidden" value={ncode} />
          </form>
          <a href="/" class="font-family:sans font-weight:400 font-size:11px color:fade-40">
            閉じる
          </a>
        </div>
        <div class="flex-grow:1">
          <iframe
            title="iframe"
            style={{ width: '100%', height: '100%', border: 0 }}
            src={getProxiedNarouUrl(ncode, page)}
          />
        </div>
      </div>,
    )
  },
)
