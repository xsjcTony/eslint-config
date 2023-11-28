import { interopDefault } from '../utils'
import type {
  FlatConfigItem,
  OptionsConfig,
  OptionsFiles,
  OptionsHasTypeScript
} from '../types'


interface ImportOptions extends OptionsHasTypeScript, OptionsFiles {
  vue?: boolean
  overrides?: {
    import?: NonNullable<OptionsConfig['overrides']>['import']
    importTypescript?: NonNullable<OptionsConfig['overrides']>['importTypescript']
  }
}


const importRules = ({ vue }: ImportOptions): FlatConfigItem['rules'] => ({
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


const importTypescriptRules = ({ vue }: ImportOptions): FlatConfigItem['rules'] => ({
  'import/extensions': [
    'error',
    'ignorePackages',
    { ts: 'never', tsx: 'never', ...vue && { vue: 'always' } }
  ],
  'import/named': 'off'
})


const importStylisticRules: FlatConfigItem['rules'] = {
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


const importTypescriptStylisticRules: FlatConfigItem['rules'] = {
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level']
}


export const importConfig = async (options: ImportOptions = {}): Promise<FlatConfigItem[]> => {
  const {
    typescript = false,
    vue = false,
    overrides,
    files
  } = options

  return [
    {
      name: 'aelita:import',
      ...files && files,
      plugins: {
        // @ts-expect-error - no dts file available
        'import': await interopDefault(import('eslint-plugin-import'))
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
        ...typescript && importTypescriptStylisticRules,
        ...overrides?.import,
        ...typescript && overrides?.importTypescript
      }
    }
  ]
}
