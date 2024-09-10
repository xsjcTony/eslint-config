import { interopDefault } from '../utils'
import type { OptionsNode, TypedFlatConfigItem } from '../types'


const nodeRules: TypedFlatConfigItem['rules'] = {
  'node/no-deprecated-api': 'error',
  'node/no-exports-assign': 'error',
  'node/no-new-require': 'error',
  'node/no-path-concat': 'error',
  'node/prefer-global/buffer': ['error', 'never'],
  'node/prefer-global/console': ['error', 'always'],
  'node/prefer-global/process': ['error', 'always'],
  'node/prefer-global/url-search-params': ['error', 'always'],
  'node/prefer-global/url': ['error', 'always'],
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
