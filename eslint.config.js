// @ts-check
import aelita, { GLOB_SRC } from './dist/index.js'


export default aelita(
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
