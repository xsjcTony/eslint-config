import { pluginImport } from '../plugins'
import type { ConfigItem, OptionsConfig } from '../types'


interface ImportOptions {
  overrides?: NonNullable<OptionsConfig['overrides']>['import']
  typescript?: boolean
}


const importRules: ConfigItem['rules'] = {
  'import/first': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/extensions': ['error', 'ignorePackages'],
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      pathGroups: [
        {
          pattern: '/src/**',
          group: 'internal'
        }
      ],
      'newlines-between': 'ignore',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      warnOnUnassignedImports: false
    }
  ],
  'import/named': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-duplicates': ['error', { considerQueryString: true }],
  'import/no-self-import': 'error'
}


const importTypescriptRules: ConfigItem['rules'] = {
  'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }]
}


const importStylisticRules: ConfigItem['rules'] = {
  'import/newline-after-import': [
    'error',
    {
      count: 2,
      // @ts-expect-error - type is not up-to-date
      exactCount: true,
      considerComments: true
    }
  ]
}


export const importConfig = ({ typescript = false, overrides }: ImportOptions): ConfigItem[] => [
  {
    name: 'aelita:import',
    plugins: {
      'import': pluginImport
    },
    settings: {
      ...typescript && {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        }
      },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', ...typescript ? ['.ts', '.tsx'] : []] },
        ...typescript && { typescript: true }
      }
    },
    rules: {
      ...importRules,
      ...typescript && importTypescriptRules,
      ...importStylisticRules,
      ...overrides,
      ...typescript && overrides?.typescript
    }
  }
]
