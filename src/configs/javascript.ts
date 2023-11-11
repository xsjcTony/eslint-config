import globals from 'globals'
import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { ConfigItem, OptionsConfig } from '../types'


interface JavascriptOptions {
  overrides?: NonNullable<OptionsConfig['overrides']>['javascript']
}


const javascriptRules: ConfigItem['rules'] = {
  curly: ['error', 'multi-or-nest', 'consistent'],
  camelcase: ['error', { properties: 'always', ignoreDestructuring: false }],
  'dot-notation': ['error', { allowKeywords: false }],
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: true,
      properties: true
    }
  ],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-multi-assign': 'error',
  'one-var': ['error', 'never'],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-unexpected-multiline': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'no-const-assign': 'error',
  'no-constant-condition': ['error', { checkLoops: false }],
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
  'function-paren-newline': ['error', 'consistent'],
  'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
  'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-dupe-class-members': 'error',
  'no-duplicate-imports': ['error', { includeExports: true }],
  'no-iterator': 'error',
  'no-undef': ['error', { 'typeof': true }],
  'no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: true,
      destructuredArrayIgnorePattern: '^_'
    }
  ],
  eqeqeq: ['error', 'always', { 'null': 'ignore' }],
  'no-with': 'error',
  'default-param-last': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-implied-eval': 'error',
  'no-loss-of-precision': 'error'
}


const javascriptStylisticRules: ConfigItem['rules'] = {
  'array-bracket-spacing': ['error', 'never'],
  'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
  'arrow-spacing': ['error', { before: true, after: true }],
  'block-spacing': ['error', 'always'],
  'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  'comma-dangle': ['error', 'never'],
  'comma-spacing': ['error', { before: false, after: true }],
  'comma-style': ['error', 'last'],
  'computed-property-spacing': ['error', 'never'],
  'dot-location': ['error', 'property'],
  'eol-last': ['error', 'always'],
  'func-call-spacing': ['error', 'never'],
  'generator-star-spacing': ['error', 'after'],
  indent: ['error', 2, { SwitchCase: 1, ignoreComments: false }],
  'jsx-quotes': ['error', 'prefer-double'],
  'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
  'keyword-spacing': ['error', { before: true, after: true }],
  'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  'new-parens': ['error', 'always'],
  'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
  'no-extra-parens': [
    'error',
    'all',
    {
      ignoreJSX: 'multi-line',
      nestedBinaryExpressions: false
    }
  ],
  'no-extra-semi': 'error',
  'no-floating-decimal': 'error',
  'no-multi-spaces': ['error', { ignoreEOLComments: true }],
  'no-multiple-empty-lines': ['error', { max: 2 }],
  'no-tabs': ['error', { allowIndentationTabs: false }],
  'no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],
  'no-whitespace-before-property': 'error',
  'nonblock-statement-body-position': ['error', 'below'],
  'object-curly-spacing': ['error', 'always'],
  'one-var-declaration-per-line': ['error', 'always'],
  'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: ['class', 'function', 'iife'] },
    { blankLine: 'always', prev: ['class', 'function', 'iife'], next: '*' }
  ],
  'quote-props': ['error', 'as-needed', { keywords: true }],
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: true
    }
  ],
  'rest-spread-spacing': ['error', 'never'],
  semi: ['error', 'never'],
  'space-before-blocks': ['error', 'always'],
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }
  ],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': ['error', { int32Hint: false }],
  'space-unary-ops': ['error', { words: true, nonwords: false }],
  'spaced-comment': ['error', 'always', { exceptions: ['-', '+', '*'], markers: ['/'] }],
  'switch-colon-spacing': ['error', { before: false, after: true }],
  'template-curly-spacing': ['error', 'never'],
  'template-tag-spacing': ['error', 'never'],
  'wrap-iife': ['error', 'inside', { functionPrototypeMethods: false }],
  'yield-star-spacing': ['error', 'after']
}


export const javascript = ({ overrides }: JavascriptOptions = {}): ConfigItem[] => [
  {
    name: 'aelita:javascript',
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      ...javascriptRules,
      ...javascriptStylisticRules,
      ...overrides
    }
  },
  {
    name: 'aelita:javascript:scripts-override',
    files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
    rules: {
      'no-console': 'off'
    }
  }
]
