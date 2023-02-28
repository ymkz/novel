import { Hono } from 'hono'
import { updateNarouItem } from '../helpers/kv'
import { narouLinkReplacer } from '../helpers/rewriter'
import { AppEnv } from '../models/env'

const app = new Hono<AppEnv>()

export const narouProxy = app.get('/:ncode/:page?', async (ctx) => {
  const { ncode, page } = ctx.req.param()

  await updateNarouItem(ctx.env.KV_NOVEL, {
    ncode,
    currentPage: Number(page) || 0,
  })

  const userAgent = ctx.req.header('user-agent') ?? ''
  const url = `https://ncode.syosetu.com/${ncode}/${page || ''}`

  const proxied = await fetch(url, { headers: { 'user-agent': userAgent } })

  return new HTMLRewriter().on('a', narouLinkReplacer).transform(proxied)
})
