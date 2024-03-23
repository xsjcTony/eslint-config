import { defineConfig } from 'tsup'


export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  inject: ['cjs-shim.ts'],
  external: ['@next/eslint-plugin-next'],
  shims: true,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
})
