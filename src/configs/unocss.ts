import { ensurePackages, interopDefault } from '../utils'
import type { OptionsUnocss, TypedFlatConfigItem } from '../types'


function unocssRules(attributify: OptionsUnocss['attributify']): TypedFlatConfigItem['rules'] {
  return {
    'unocss/order': 'error',
    ...attributify && { 'unocss/attributify': 'error' },
    'unocss/blocklist': 'error',
    'unocss/enforce-class-compile': 'off',
  }
}


export async function unocss(options: OptionsUnocss = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files,
    attributify = false,
    overrides,
  } = options


  await ensurePackages(['@unocss/eslint-plugin'])


  return [
    {
      name: 'aelita:unocss:setup',
      plugins: {
        unocss: await interopDefault(import('@unocss/eslint-plugin')),
      },
    },
    {
      name: 'aelita:unocss:rules',
      ...files && files,
      rules: unocssRules(attributify),
    },
    ...overrides
      ? [{
        name: 'aelita:unocss:override:custom',
        ...files && files,
        rules: overrides,
      }]
      : [],
  ]
}
