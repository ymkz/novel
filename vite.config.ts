import { builtinModules } from "module";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  server: {
    open: false,
    port: 3000,
  },
  ssr: {
    noExternal: true,
  },
  build: {
    rollupOptions: {
      external: [...builtinModules, /^node:/],
      input: "_worker.ts",
      output: {
        dir: "./dist",
      },
    },
  },
  plugins: [
    devServer({
      entry: "src/index.ts",
      exclude: ["/static/.+", ...defaultOptions.exclude],
      cf: {
        kvNamespaces: ["KV"],
      },
    }),
  ],
});
