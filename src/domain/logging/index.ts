import { createMiddleware } from "hono/factory";

export const loggingMiddleware = createMiddleware(async (ctx, next) => {
  const url = ctx.req.url;
  const method = ctx.req.method;

  console.info(
    JSON.stringify({
      message: "request incoming",
      req: { url, method },
    }),
  );

  await next();

  console.info(
    JSON.stringify({
      message: "request completed",
      req: { url, method },
      res: { statusCode: ctx.res.status },
    }),
  );
});
