import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  server: {
    open: false,
    port: 3000,
  },
  plugins: [
    pages(),
    devServer({
      entry: "src/index.ts",
      cf: { kvNamespaces: ["KV"] },
    }),
  ],
});
