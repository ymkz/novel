const errorHandler: PagesFunction<Env> = async ({ next }) => {
  return await next().catch((error: { reason: string; status: number }) => {
    console.error(`[ERROR] ${error.reason}`)
    return new Response(JSON.stringify({ error: { reason: error.reason } }), {
      status: error.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}

export const onRequest = [errorHandler]
