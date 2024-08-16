import { GLOB_UNIT_TESTS } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type { OptionsVitest, TypedFlatConfigItem } from '../types'


function vitestRules(isInEditor: OptionsVitest['isInEditor']): TypedFlatConfigItem['rules'] {
  return {
    'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
    'vitest/no-identical-title': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/no-focused-tests': isInEditor ? 'off' : ['error', { fixable: false }],
    'vitest/prefer-hooks-in-order': 'error',
    'vitest/prefer-lowercase-title': 'error',
  }
}


export async function vitest(options: OptionsVitest = {}): Promise<TypedFlatConfigItem[]> {

  const {
    isInEditor = false,
    typeCheck = false,
    files = GLOB_UNIT_TESTS,
    overrides,
  } = options


  await ensurePackages(['@vitest/eslint-plugin'])


  const pluginVitest = await interopDefault(import('@vitest/eslint-plugin'))


  return [
    {
      name: 'aelita:vitest:setup',
      plugins: {
        vitest: pluginVitest,
      },
      settings: {
        vitest: {
          typecheck: typeCheck,
        },
      },
      languageOptions: {
        globals: {
          ...pluginVitest.environments.env.globals,
        },
      },
    },
    {
      name: 'aelita:vitest:rules',
      files,
      rules: vitestRules(isInEditor),
    },
    ...overrides
      ? [{
        name: 'aelita:vitest:override:custom',
        files,
        rules: overrides,
      }]
      : [],
  ]
}
