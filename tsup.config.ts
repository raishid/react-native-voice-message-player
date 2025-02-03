import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".png": "file",
      ".jpg": "file",
      ".jpeg": "file",
      ".svg": "file",
    },
    options.assetNames = 'assets/[name]-[hash][extname]'
  },
  experimentalDts: {
    entry: 'src/index.ts',
  },
  external: ['react', 'react-native']
})