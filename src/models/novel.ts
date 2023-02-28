import { z } from 'zod'

export const novelSchema = z.object({
  ncode: z.string(),
  currentPage: z.number(),
})
export type Novel = z.infer<typeof novelSchema>

export const novelAddSchema = z.object({
  url: z.string().url(),
})
export type NovelAddInput = z.infer<typeof novelAddSchema>

export const novelDeleteSchema = z.object({
  ncode: z.string(),
})
export type NovelDeleteInput = z.infer<typeof novelDeleteSchema>
