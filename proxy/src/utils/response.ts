export function Ok(init?: ResponseInit) {
  return new Response(undefined, { ...init })
}

export function OkJson(body: any, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    ...init,
  })
}

export function NotFound() {
  return new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  })
}

export function BadRequest() {
  return new Response('Bad Request', {
    status: 400,
    statusText: 'Bad Request',
  })
}

export function InternalError() {
  return new Response('Internal Error', {
    status: 500,
    statusText: 'Internal Error',
  })
}
