import * as v from 'valibot'

export const narouNcodeSchema = v.pipe(
	v.string(),
	v.nonEmpty('Please enter value.'),
	v.startsWith('n', 'Only `ncode` format are allowed.'),
)

export const narouNovelPageUrlSchema = v.pipe(
	v.string(),
	v.nonEmpty('Please enter value.'),
	v.url('The url is badly formatted.'),
	v.startsWith('https://ncode.syosetu.com', 'Only `ncode.syosetu.com` domains are allowed.'),
)

export const narouNovelPageSchema = v.optional(
	v.pipe(
		v.string(),
		v.transform((value: string) => Number(value)),
		v.number(),
		v.integer(),
		v.toMinValue(1),
	),
	'0',
)
