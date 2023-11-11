import { GLOB_SRC } from '../globs'
import { pluginPlaywright } from '../plugins'
import type { ConfigItem, OptionsConfig } from '../types'


interface PlaywrightOptions {
  overrides?: NonNullable<OptionsConfig['overrides']>['playwright']
}


const playwrightRules: ConfigItem['rules'] = {
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
      ignoreTopLevelDescribe: true
    }
  ],
  'playwright/prefer-to-be': 'error',
  'playwright/prefer-to-have-length': 'error',
  'playwright/valid-expect': [
    'error',
    {
      minArgs: 1,
      maxArgs: 2
    }
  ],
  'playwright/prefer-web-first-assertions': 'error',
  'playwright/no-networkidle': 'error',
  'playwright/no-nested-step': 'error',
  'playwright/prefer-to-contain': 'error',
  'playwright/prefer-to-have-count': 'error'
}


export const playwright = ({ overrides }: PlaywrightOptions): ConfigItem[] => [
  {
    name: 'aelita:playwright',
    files: [GLOB_SRC],
    plugins: {
      playwright: pluginPlaywright
    },
    rules: {
      ...playwrightRules,
      ...overrides
    }
  }
]
