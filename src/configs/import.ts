import type { OptionsImport, TypedFlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'


function importRules(options: OptionsImport): TypedFlatConfigItem['rules'] {
  const {
    vue,
    ruleOptions,
  } = options

  return {
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        checkTypeImports: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ...vue && { vue: 'always' },
        },
      },
    ],
    'import/order': [
      'error',
      {
        groups: ruleOptions?.order?.typeImportsFirst ?? false
          ? ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object']
          : ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'ignore',
        pathGroups: ruleOptions?.order?.pathGroups,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: false,
      },
    ],
    'import/named': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-self-import': 'error',
  }
}


function importTypescriptRules(options: OptionsImport): TypedFlatConfigItem['rules'] {
  return {
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        checkTypeImports: true,
        pattern: {
          ts: 'never',
          tsx: 'never',
          ...options.vue && { vue: 'always' },
        },
      },
    ],
    'import/named': 'off',
  }
}


const importStylisticRules: TypedFlatConfigItem['rules'] = {
  'import/newline-after-import': ['error', { count: 2, exactCount: true, considerComments: true }],
}


const importTypescriptStylisticRules: TypedFlatConfigItem['rules'] = {
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
}


export async function importConfig(options: OptionsImport = {}): Promise<TypedFlatConfigItem[]> {

  const {
    typescript = false,
    stylistic = true,
    overrides,
    vue = false,
    tsResolverOptions,
  } = options


  await ensurePackages([
    'eslint-plugin-import-x',
    ...typescript ? ['eslint-import-resolver-typescript'] : [],
  ])


  return [
    {
      name: 'aelita:import:setup',
      plugins: {
        'import': await interopDefault(import('eslint-plugin-import-x')),
      },
      settings: {
        ...typescript && {
          'import-x/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', ...vue ? ['.vue'] : []],
          },
        },
        'import-x/resolver': {
          node: {
            extensions: [
              '.js',
              '.jsx',
              ...typescript ? ['.ts', '.tsx'] : [],
              ...vue ? ['.vue'] : [],
            ],
          },
          ...typescript && {
            typescript: tsResolverOptions ?? true,
          },
        },
      },
    },
    {
      name: 'aelita:import:rules',
      rules: {
        ...importRules(options),
        ...typescript && importTypescriptRules(options),
      },
    },
    ...stylistic
      ? [{
        name: 'aelita:import:rules:stylistic',
        rules: importStylisticRules,
      }]
      : [],
    ...typescript && stylistic
      ? [{
        name: 'aelita:import:rules:typescript-and-stylistic',
        rules: importTypescriptStylisticRules,
      }]
      : [],
    ...overrides
      ? [{
        name: 'aelita:import:override:custom',
        rules: overrides,
      }]
      : [],
  ]
}
