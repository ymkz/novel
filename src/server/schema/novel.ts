import { z } from 'zod'

export const novelAddSchema = z.object({
  url: z.string().url(),
})
export type NovelAddInput = z.infer<typeof novelAddSchema>

export const novelDeleteSchema = z.object({
  ncode: z.string(),
})
export type NovelDeleteInput = z.infer<typeof novelDeleteSchema>
