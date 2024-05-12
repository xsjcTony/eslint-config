import { GLOB_E2E_TESTS } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type { OptionsPlaywright, TypedFlatConfigItem } from '../types'


const playwrightRules: TypedFlatConfigItem['rules'] = {
  'playwright/no-conditional-in-test': 'warn',
  'playwright/no-element-handle': 'error',
  'playwright/no-eval': 'error',
  'playwright/no-focused-test': 'error',
  'playwright/no-force-option': 'warn',
  'playwright/no-page-pause': 'error',
  'playwright/no-skipped-test': 'error',
  'playwright/no-useless-not': 'error',
  'playwright/no-wait-for-timeout': 'warn',
  'playwright/prefer-strict-equal': 'warn',
  'playwright/prefer-lowercase-title': [
    'off',
    {
      ignore: ['test.describe'],
      ignoreTopLevelDescribe: true,
    },
  ],
  'playwright/prefer-to-be': 'error',
  'playwright/prefer-to-have-length': 'error',
  'playwright/valid-expect': [
    'error',
    {
      minArgs: 1,
      maxArgs: 2,
    },
  ],
  'playwright/prefer-web-first-assertions': 'error',
  'playwright/no-networkidle': 'error',
  'playwright/no-nested-step': 'error',
  'playwright/prefer-to-contain': 'error',
  'playwright/prefer-to-have-count': 'error',
  'playwright/valid-title': 'error',
  'playwright/no-wait-for-selector': 'error',
  'playwright/no-get-by-title': 'warn',
  'playwright/no-unsafe-references': 'error',
  'playwright/no-conditional-expect': 'error',
  'playwright/no-duplicate-hooks': 'error',
  'playwright/no-standalone-expect': 'error',
  'playwright/prefer-hooks-in-order': 'error',
  'playwright/prefer-hooks-on-top': 'error',
  'playwright/prefer-comparison-matcher': 'error',
  'playwright/prefer-equality-matcher': 'error',
  'playwright/valid-describe-callback': 'error',
  'playwright/valid-expect-in-promise': 'error',
}


export async function playwright(options: OptionsPlaywright = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files = GLOB_E2E_TESTS,
    overrides,
  } = options


  await ensurePackages(['eslint-plugin-playwright'])


  return [
    {
      name: 'aelita:playwright:setup',
      plugins: {
        playwright: await interopDefault(import('eslint-plugin-playwright')),
      },
    },
    {
      name: 'aelita:playwright:rules',
      files,
      rules: playwrightRules,
    },
    ...overrides
      ? [{
        name: 'aelita:playwright:override:custom',
        files,
        rules: overrides,
      }]
      : [],
  ]
}
