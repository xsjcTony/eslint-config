import { pluginImport } from '../plugins'
import type { ConfigItem, OptionsConfig, OptionsHasTypeScript } from '../types'


interface ImportOptions extends OptionsHasTypeScript {
  vue?: boolean
  overrides?: NonNullable<OptionsConfig['overrides']>['import']
}


const importRules = ({ vue }: ImportOptions): ConfigItem['rules'] => ({
  'import/first': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/extensions': [
    'error',
    'ignorePackages',
    { js: 'never', jsx: 'never', ...vue && { vue: 'always' } }
  ],
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
})


const importTypescriptRules = ({ vue }: ImportOptions): ConfigItem['rules'] => ({
  'import/extensions': [
    'error',
    'ignorePackages',
    { ts: 'never', tsx: 'never', ...vue && { vue: 'always' } }
  ]
})


const importStylisticRules: ConfigItem['rules'] = {
  'import/newline-after-import': [
    'error',
    {
      count: 2,
      // @ts-expect-error - type definition is not up-to-date
      exactCount: true,
      considerComments: true
    }
  ]
}


export const importConfig = (options: ImportOptions = {}): ConfigItem[] => {
  const { typescript = false, vue = false, overrides } = options

  return [
    {
      name: 'aelita:import',
      plugins: {
        'import': pluginImport
      },
      settings: {
        ...typescript && {
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', ...vue ? ['.vue'] : []]
          }
        },
        'import/resolver': {
          node: {
            extensions: [
              '.js',
              '.jsx',
              ...typescript ? ['.ts', '.tsx'] : [],
              ...vue ? ['.vue'] : []
            ]
          },
          ...typescript && { typescript: true }
        }
      },
      rules: {
        ...importRules(options),
        ...typescript && importTypescriptRules(options),
        ...importStylisticRules,
        ...overrides,
        ...typescript && overrides?.typescript
      }
    }
  ]
}
