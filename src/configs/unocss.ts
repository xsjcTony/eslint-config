import { GLOB_SRC } from '../globs'
import { pluginUnocss } from '../plugins'
import type { OptionsConfig, ConfigItem, OptionsUnocss } from '../types'


interface UnocssOptions extends OptionsUnocss {
  overrides?: NonNullable<OptionsConfig['overrides']>['unocss']
}


const unocssRules = (attributify: UnocssOptions['attributify']): ConfigItem['rules'] => ({
  'unocss/order': 'error',
  ...attributify && { 'unocss/attributify': 'error' },
  'unocss/blocklist': 'error'
})


export const unocss = ({ files = [GLOB_SRC], attributify, overrides }: UnocssOptions): ConfigItem[] => [
  {
    name: 'aelita:playwright',
    files,
    plugins: {
      unocss: pluginUnocss
    },
    rules: {
      ...unocssRules(attributify),
      ...overrides
    }
  }
]
