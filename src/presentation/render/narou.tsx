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
      <div class="viewer-container">
        <div class="viewer-header">
          <form hx-delete="/api/narou" hx-trigger="click">
            <span class="viewer-delete">削除</span>
            <input name="ncode" type="hidden" value={ncode} />
          </form>
          <a href="/" class="viewer-close">
            閉じる
          </a>
        </div>
        <div class="viewer-content">
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
