import { defineConfig } from 'tsup'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  sourcemap: true,
  dts: { resolve: true, only: false },
  format: ['esm', 'cjs'],
  outDir: 'dist',
  minify: production,
  target: ['es2022', 'node16'],
  shims: false,
  watch: !production,
  external: ['react', 'react-dom', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'react-markdown'],
  esbuildOptions(options) {
    options.define = {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }
    return options
  },
  onSuccess: 'pnpm build:css',
})
