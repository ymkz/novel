import { Hono } from "hono";
import { narouAdd } from "~/presentation/handler/narou-add";
import { narouDelete } from "~/presentation/handler/narou-delete";
import { narouProxy } from "~/presentation/handler/narou-proxy";
import { indexPage } from "~/presentation/render/index";
import { narouPage } from "~/presentation/render/narou";
import { renderer } from "~/presentation/render/renderer";

const app = new Hono();

app.get("*", renderer);

app.route("/api/narou/add", narouAdd);
app.route("/api/narou/delete/:ncode", narouDelete);
app.route("/proxy/narou/:ncode/:page?", narouProxy);

app.route("/", indexPage);
app.route("/viewer/narou/:ncode/:page?", narouPage);

export default app;
