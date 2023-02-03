import { z } from 'zod'

export const novelSchema = z.object({
  ncode: z.string(),
  currentPage: z.number(),
})
export type NovelSchema = z.infer<typeof novelSchema>

export const novelAddSchema = z.object({
  url: z.string().url(),
})
export type NovelAddSchema = z.infer<typeof novelAddSchema>

// export const novelRemoveSchema = z.object({
//   ncode: z.string(),
// })
// export type NovelRemoveSchema = z.infer<typeof novelRemoveSchema>
