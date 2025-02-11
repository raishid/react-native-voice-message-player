import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  splitting: true,
  clean: true,
  outDir: "lib",
  format: "esm",
  bundle: true,
  // minify: true,
  experimentalDts: true,
  esbuildOptions(options) {
    (options.jsx = "automatic"),
      (options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
        ".svg": "file",
      }),
      (options.assetNames = "assets/[name]-[hash]");
  },
  external: ["react", "react-native", "expo-av"],
});
