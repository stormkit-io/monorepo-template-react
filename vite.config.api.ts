import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import glob from "glob";
import { build } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pj = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf-8")
);

const files = glob.sync("src/api/**/*.ts").map((file: string) => ({
  entry: `./${file}`,
  distFileName: file.replace("src/api/", "").replace(".ts", ""),
}));

files.forEach(async (file: { entry: string; distFileName: string }) => {
  await build({
    ssr: {
      noExternal: Object.keys(pj.dependencies || {}).concat(
        Object.keys(pj.devDependencies || {})
      ),
    },
    configFile: false,
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: path.resolve(__dirname, "src"),
        },
      ],
      extensions: [".ts", ".tsx"],
    },
    build: {
      ssr: true,
      copyPublicDir: false,
      rollupOptions: {
        input: {
          [file.distFileName]: file.entry,
        },
        output: {
          dir: ".stormkit/api",
          format: "cjs",
        },
      },
      minify: false,
    },
  });
});
