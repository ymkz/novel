import { narouPage } from '../../../src/functions/narou/page'

export const onRequestGet: PagesFunction<Env, NarouPageParams> = async (
  ctx
) => {
  return narouPage(ctx)
}
