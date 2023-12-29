import { defineConfig } from 'tsup'


export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  shims: true,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
})
