import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import react from "@vitejs/plugin-react";

process.env.NODE_ENV = "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    noExternal: fs
      .readdirSync(path.join(__dirname, "node_modules"), {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
      .map((dirent) => new RegExp(dirent.name)),
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
