import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";
import react from "@vitejs/plugin-react";
import pj from "./package.json";

process.env.NODE_ENV = "production";

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    noExternal: Object.keys(pj.dependencies || {}).concat(
      Object.keys(pj.devDependencies || {})
    ),
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "src"),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    ssr: true,
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: { server: "src/entry-server.tsx" },
      output: {
        dir: ".stormkit/server",
        format: "esm",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
      },
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: ".stormkit/public/index.html",
          dest: "../.stormkit/server",
        },
      ],
    }),
  ],
});
