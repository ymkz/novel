import { Hono } from "hono";
import { narouAdd } from "./presentation/handler/narou-add";
import { narouDelete } from "./presentation/handler/narou-delete";
import { narouProxy } from "./presentation/handler/narou-proxy";
import { page } from "./presentation/render/index";
import { renderer } from "./presentation/render/renderer";

const app = new Hono();

app.route("/api/narou/add", narouAdd);
app.route("/api/narou/delete", narouDelete);

app.route("/proxy/narou", narouProxy);

app.get("*", renderer);
app.get("/", page);

export { app };
export default app;
