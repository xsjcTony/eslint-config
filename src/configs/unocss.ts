import { interopDefault } from '../utils'
import type { OptionsConfig, FlatConfigItem, OptionsUnocss } from '../types'


interface UnocssOptions extends OptionsUnocss {
  overrides?: NonNullable<OptionsConfig['overrides']>['unocss']
}


const unocssRules = (attributify: UnocssOptions['attributify']): FlatConfigItem['rules'] => ({
  'unocss/order': 'error',
  ...attributify && { 'unocss/attributify': 'error' },
  'unocss/blocklist': 'error'
})


export const unocss = async ({
  files,
  attributify,
  overrides
}: UnocssOptions): Promise<FlatConfigItem[]> => [
  {
    name: 'aelita:playwright',
    files,
    plugins: {
      unocss: await interopDefault(import('@unocss/eslint-plugin'))
    },
    rules: {
      ...unocssRules(attributify),
      ...overrides
    }
  }
]
