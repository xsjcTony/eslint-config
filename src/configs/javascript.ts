import globals from 'globals'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { interopDefault } from '../utils'
import type { OptionsJavaScript, TypedFlatConfigItem } from '../types'


function javascriptRules(isInEditor: boolean): TypedFlatConfigItem['rules'] {
  return {
    curly: ['error', 'multi-or-nest', 'consistent'],
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: false,
        ignoreGlobals: false,
        allow: ['^_'],
      },
    ],
    'dot-notation': ['error', { allowKeywords: true }],
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: true,
        properties: true,
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-assign': 'error',
    'one-var': ['error', 'never'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unexpected-multiline': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-const-assign': 'error',
    'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],
    'no-var': 'error',
    'no-object-constructor': 'error',
    'object-shorthand': ['error', 'always'],
    'no-prototype-builtins': 'error',
    'no-array-constructor': 'error',
    'prefer-template': 'error',
    'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: false }],
    'no-eval': ['error', { allowIndirect: false }],
    'no-useless-escape': 'error',
    'no-new-func': 'error',
    'prefer-rest-params': 'error',
    'no-loop-func': 'error',
    'prefer-spread': 'error',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'no-iterator': 'error',
    'no-undef': ['error', { 'typeof': true }],
    eqeqeq: ['error', 'always', { 'null': 'ignore' }],
    'no-with': 'error',
    'default-param-last': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-implied-eval': 'error',
    'no-loss-of-precision': 'error',
    'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
    'symbol-description': 'error',
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  }
}


export async function javascript(options: OptionsJavaScript = {}): Promise<TypedFlatConfigItem[]> {

  const {
    isInEditor = false,
    overrides,
  } = options


  const pluginUnusedImports = await interopDefault(import('eslint-plugin-unused-imports'))


  return [
    {
      name: 'aelita:javascript',
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
            impliedStrict: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      rules: {
        ...javascriptRules(isInEditor),
        ...overrides,
      },
    },
    ...overrides
      ? [{
        name: 'aelita:javascript:override:custom',
        rules: overrides,
      }]
      : [],
    {
      name: 'aelita:javascript:override:cli',
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off',
      },
    },
  ]
}
