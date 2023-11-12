import { GLOB_SRC } from '../globs'
import { pluginUnocss } from '../plugins'
import type { OptionsConfig, ConfigItem, OptionsUnocss } from '../types'


interface UnocssOptions extends OptionsUnocss {
  overrides?: NonNullable<OptionsConfig['overrides']>['unocss']
}


const unocssRules = ({ attributify }: UnocssOptions): ConfigItem['rules'] => ({
  'unocss/order': 'error',
  ...attributify && { 'unocss/attributify': 'error' },
  'unocss/blocklist': 'error'
})


export const unocss = (options: UnocssOptions): ConfigItem[] => [
  {
    name: 'aelita:playwright',
    files: [GLOB_SRC],
    plugins: {
      unocss: pluginUnocss
    },
    rules: {
      ...unocssRules(options),
      ...options.overrides
    }
  }
]
