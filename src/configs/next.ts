import { GLOB_SRC } from '../globs'
import { interopDefault, renameRules } from '../utils'
import type { OptionsConfig, OptionsNext, FlatConfigItem } from '../types'


interface NextOptions extends OptionsNext {
  overrides?: NonNullable<OptionsConfig['overrides']>['next']
}


const nextRules = (pluginNext: any): FlatConfigItem['rules'] => ({
  ...pluginNext.configs.recommended.rules,
  ...pluginNext.configs['core-web-vitals'].rules,
})


export const next = async ({
  files = [GLOB_SRC],
  overrides,
}: NextOptions): Promise<FlatConfigItem[]> => {

  // @ts-expect-error - no dts file available
  const pluginNext = await interopDefault(import('@next/eslint-plugin-next'))


  return [
    {
      name: 'aelita:next',
      files,
      plugins: {
        next: pluginNext,
      },
      rules: {
        ...renameRules(nextRules(pluginNext) ?? {}, '@next/next', 'next'),
        ...overrides,
      },
    },
  ]
}
