import type { OptionsNext, TypedFlatConfigItem } from '../types'
import { GLOB_SRC } from '../globs'
import { ensurePackages, interopDefault, renameRules } from '../utils'


function nextRules(pluginNext: any): TypedFlatConfigItem['rules'] {
  return {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs['core-web-vitals'].rules,
  }
}


export async function next(options: OptionsNext = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files = [GLOB_SRC],
    overrides,
  } = options


  await ensurePackages(['@next/eslint-plugin-next'])


  const pluginNext = await interopDefault(import('@next/eslint-plugin-next'))


  return [
    {
      name: 'aelita:next',
      files,
      plugins: {
        next: pluginNext,
      },
      rules: {
        ...renameRules(nextRules(pluginNext) ?? {}, { '@next/next': 'next' }),
        ...overrides,
      },
    },
  ]
}
