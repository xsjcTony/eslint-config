import { defineBuildConfig } from 'unbuild'


export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    '@typescript-eslint/types',
    'eslint',
    'eslint-import-resolver-node',
  ],
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false,
    },
    output: {
      exports: 'named',
    },
  },
})
