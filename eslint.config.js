// @ts-check
import defineConfig from './dist/index.js'


export default defineConfig(
  {
    typescript: {
      tsconfigPath: ['./tsconfig.json', './tsconfig.node.js.json'],
      projectType: 'lib',
    },
  },
  {
    rules: {
      'ts/sort-type-constituents': 'off',
    },
  },
)
