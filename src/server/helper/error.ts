export class KVError extends Error {
  override readonly name = 'KVError' as const
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.cause = options?.cause
  }
}

export const createKVError = ({
  reason,
  cause,
}: {
  reason: string
  cause?: unknown
}) => {
  return new KVError(JSON.stringify({ reason }), { cause })
}

export class FetchError extends Error {
  override readonly name = 'FetchError' as const
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.cause = options?.cause
  }
}

export const createFetchError = ({
  reason,
  url,
  cause,
}: {
  reason: string
  url: string
  cause?: unknown
}) => {
  return new FetchError(JSON.stringify({ reason, url }), { cause })
}

// export const ErrorCode = {
//   UNKNOWN: 'UNKNOWN',

//   KV_GET_NAROU_DATA_FAILURE: 'KV_GET_NAROU_DATA_FAILURE',
//   KV_ADD_NAROU_ITEM_FAILURE: 'KV_ADD_NAROU_ITEM_FAILURE',
//   KV_DELETE_NAROU_ITEM_FAILURE: 'KV_DELETE_NAROU_ITEM_FAILURE',
//   KV_UPDATE_NAROU_ITEM_FAILURE: 'KV_UPDATE_NAROU_ITEM_FAILURE',

//   REQUEST_BODY_PARSE_FAILURE: 'REQUEST_BODY_PARSE_FAILURE',
//   REQUEST_BODY_URL_MISSING: 'REQUEST_BODY_URL_MISSING',
//   REQUEST_BODY_NCODE_MISSING: 'REQUEST_BODY_NCODE_MISSING',
//   REQUEST_PARAM_PARSE_FAILURE: 'REQUEST_PARAM_PARSE_FAILURE',

//   FETCH_NAROU_INFO_FAIL_ON_CLIENT: 'FETCH_NAROU_INFO_FAIL_ON_CLIENT',
//   FETCH_NAROU_INFO_FAIL_ON_SERVER: 'FETCH_NAROU_INFO_FAIL_ON_SERVER',
//   FETCH_NAROU_INFO_CANNOT_PARSE: 'FETCH_NAROU_INFO_CANNOT_PARSE',

//   INVALID_HTTP_URL: 'INVALID_HTTP_URL',
// } as const

// export class AppError extends Error {
//   constructor(
//     public code: keyof typeof ErrorCode = ErrorCode.UNKNOWN,
//     public statusCode: number = 500,
//     public message: string = 'unknown unexpected error caused'
//   ) {
//     super(message)
//     this.name = new.target.name
//   }

//   toString() {
//     return JSON.stringify({ error: this.toJson() })
//   }

//   toJson() {
//     return {
//       code: this.code,
//       message: this.message,
//     }
//   }
// }

// export const E = {
//   Unknown: new AppError(),

//   KvGetNarouDataFailure: new AppError(
//     'KV_GET_NAROU_DATA_FAILURE',
//     500,
//     'failed to get narou data from kv'
//   ),
//   KvAddNarouItemFailure: new AppError(
//     'KV_ADD_NAROU_ITEM_FAILURE',
//     500,
//     'failed to add narou item from kv'
//   ),
//   KvDeleteNarouItemFailure: new AppError(
//     'KV_DELETE_NAROU_ITEM_FAILURE',
//     500,
//     'failed to delete narou item from kv'
//   ),
//   KvUpdateNarouItemFailure: new AppError(
//     'KV_UPDATE_NAROU_ITEM_FAILURE',
//     500,
//     'failed to update narou item from kv'
//   ),

//   RequestBodyParseFailure: new AppError(
//     'REQUEST_BODY_PARSE_FAILURE',
//     400,
//     'request body can not parse as json'
//   ),
//   RequestBodyUrlMissing: new AppError(
//     'REQUEST_BODY_URL_MISSING',
//     400,
//     'request body <url> is required'
//   ),
//   RequestBodyNcodeMissing: new AppError(
//     'REQUEST_BODY_NCODE_MISSING',
//     400,
//     'request body <ncode> is required'
//   ),
//   RequestParamParseFailure: new AppError(
//     'REQUEST_PARAM_PARSE_FAILURE',
//     400,
//     'request param <image-key> is required'
//   ),

//   FetchNarouInfoFailOnClient: new AppError(
//     'FETCH_NAROU_INFO_FAIL_ON_CLIENT',
//     500,
//     'failed to connect narou info url'
//   ),
//   FetchNarouInfoFailOnServer: new AppError(
//     'FETCH_NAROU_INFO_FAIL_ON_SERVER',
//     500,
//     'error responded from narou info url'
//   ),
//   FetchNarouInfoCannotParse: new AppError(
//     'FETCH_NAROU_INFO_CANNOT_PARSE',
//     500,
//     'failed on parse narou info as json'
//   ),

//   InvalidHttpUrl: new AppError(
//     'INVALID_HTTP_URL',
//     500,
//     'invalid url as http protocol'
//   ),
// }
