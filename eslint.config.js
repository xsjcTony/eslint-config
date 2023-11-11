// @ts-check
import defineConfig, { GLOB_SRC } from './dist/index.js'


export default defineConfig(
  {
    typescript: {
      tsconfigPath: ['./tsconfig.json', './tsconfig.node.js.json']
    }
  },
  {
    files: [GLOB_SRC],
    rules: {
      'ts/sort-type-constituents': 'off'
    }
  }
)
