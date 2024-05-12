import { interopDefault } from '../utils'
import type { OptionsNode, TypedFlatConfigItem } from '../types'


const nodeRules: TypedFlatConfigItem['rules'] = {
  'node/no-deprecated-api': 'error',
  'node/no-exports-assign': 'error',
  'node/no-new-require': 'error',
  'node/no-path-concat': 'error',
  'node/prefer-global/buffer': ['error', 'never'],
  'node/prefer-global/process': ['error', 'never'],
  'node/prefer-global/url-search-params': ['error', 'never'],
  'node/prefer-global/url': ['error', 'never'],
  'node/process-exit-as-throw': 'error',
}


export async function node(options: OptionsNode = {}): Promise<TypedFlatConfigItem[]> {

  const { overrides } = options


  return [
    {
      name: 'aelita:node:setup',
      plugins: {
        node: await interopDefault(import('eslint-plugin-n')),
      },
    },
    {
      name: 'aelita:node:rules',
      rules: nodeRules,
    },
    ...overrides
      ? [{
        name: 'aelita:node:override:custom',
        rules: overrides,
      }]
      : [],
  ]
}
