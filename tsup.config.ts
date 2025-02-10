import { defineConfig } from "tsup";
import { copy } from "esbuild-plugin-copy";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  splitting: true,
  clean: true,
  outDir: "lib",
  minify: true,
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
  esbuildPlugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["src/types.d.ts"],
        to: ["lib/types.d.ts"],
      },
    }),
  ],
});
