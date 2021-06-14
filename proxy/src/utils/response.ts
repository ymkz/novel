export function Ok(init?: ResponseInit) {
  return new Response(undefined, { ...init })
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

export function InternalWorkerError(message: any = 'Internal Error') {
  return new Response(message, {
    status: 500,
    statusText: 'Internal Error',
  })
}
