import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  splitting: true,
  clean: true,
  outDir: "lib",
  minify: true,
  experimentalDts: true,
  esbuildOptions(options) {
    (options.loader = {
      ...options.loader,
      ".png": "file",
      ".jpg": "file",
      ".jpeg": "file",
      ".svg": "file",
    }),
      (options.assetNames = "assets/[name]-[hash][extname]");
  },
  external: ["react", "react-native"],
});
