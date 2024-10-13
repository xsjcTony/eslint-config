import { defineBuildConfig } from 'unbuild'


export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: ['@typescript-eslint/types'],
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
