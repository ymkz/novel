import { narouIndex } from '../../../src/functions/narou'

export const onRequestGet: PagesFunction<Env, NarouIndexParams> = async (
  ctx
) => {
  return narouIndex(ctx)
}
