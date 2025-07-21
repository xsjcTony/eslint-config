import type { OptionsConfig, OptionsStylistic, TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'


type FilledStylisticConfig = Required<OptionsStylistic>


const STYLISTIC_DEFAULT_CONFIG: FilledStylisticConfig = {
  semi: false,
  indent: 2,
  quotes: 'single',
  commaDangle: 'always-multiline',
}


export function resolveStylisticConfig(
  config: OptionsStylistic | boolean | undefined,
): FilledStylisticConfig | false {
  if (config === false)
    return false

  return typeof config === 'object'
    ? { ...STYLISTIC_DEFAULT_CONFIG, ...config }
    : STYLISTIC_DEFAULT_CONFIG
}


function jsTsSharedRules(config: FilledStylisticConfig): TypedFlatConfigItem['rules'] {
  const {
    semi,
    quotes,
    indent,
    commaDangle,
  } = config

  return {
    'style/array-bracket-newline': ['error', 'consistent'],
    'style/array-bracket-spacing': ['error', 'never'],
    'style/array-element-newline': ['error', { consistent: true, multiline: true }],
    'style/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'style/arrow-spacing': ['error', { before: true, after: true }],
    'style/block-spacing': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/comma-dangle': ['error', commaDangle],
    'style/comma-spacing': ['error', { before: false, after: true }],
    'style/comma-style': ['error', 'last'],
    'style/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
    'style/dot-location': ['error', 'property'],
    'style/eol-last': ['error', 'always'],
    'style/function-call-argument-newline': ['error', 'consistent'],
    'style/function-call-spacing': ['error', 'never'],
    'style/function-paren-newline': ['error', 'consistent'],
    'style/generator-star-spacing': ['error', { before: false, after: true }],
    'style/indent': ['error', indent, { SwitchCase: 1, ignoreComments: false }],
    'style/jsx-quotes': ['error', 'prefer-double'],
    'style/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'style/keyword-spacing': ['error', { before: true, after: true }],
    'style/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
        exceptAfterOverload: true,
      },
    ],
    'style/multiline-ternary': ['error', 'always-multiline'],
    'style/new-parens': ['error', 'always'],
    'style/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    'style/no-extra-parens': [
      'error',
      'all',
      {
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false,
        nestedConditionalExpressions: false,
      },
    ],
    'style/no-extra-semi': 'error',
    'style/no-floating-decimal': 'error',
    'style/no-mixed-operators': ['error', { allowSamePrecedence: true }],
    'style/no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'style/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0 }],
    'style/no-tabs': ['error', { allowIndentationTabs: false }],
    'style/no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],
    'style/no-whitespace-before-property': 'error',
    'style/nonblock-statement-body-position': ['error', 'below'],
    'style/object-curly-spacing': ['error', 'always'],
    'style/one-var-declaration-per-line': ['error', 'always'],
    'style/operator-linebreak': ['error', 'before', { overrides: { '=': 'ignore' } }],
    'style/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['class', 'function', 'iife', 'interface'] },
      { blankLine: 'always', prev: ['class', 'function', 'iife', 'interface'], next: '*' },
    ],
    'style/quote-props': ['error', 'as-needed', { keywords: true }],
    'style/quotes': ['error', quotes, { avoidEscape: true, allowTemplateLiterals: true }],
    'style/rest-spread-spacing': ['error', 'never'],
    'style/semi': ['error', semi ? 'always' : 'never'],
    'style/semi-spacing': ['error', { before: false, after: true }],
    'style/semi-style': ['error', 'last'],
    'style/space-before-blocks': ['error', 'always'],
    'style/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'style/space-in-parens': ['error', 'never'],
    'style/space-infix-ops': ['error', { int32Hint: false, ignoreTypes: false }],
    'style/space-unary-ops': ['error', { words: true, nonwords: false }],
    'style/spaced-comment': ['error', 'always', { exceptions: ['-', '+', '*'], markers: ['/'] }],
    'style/switch-colon-spacing': ['error', { before: false, after: true }],
    'style/template-curly-spacing': ['error', 'never'],
    'style/template-tag-spacing': ['error', 'never'],
    'style/wrap-iife': ['error', 'inside', { functionPrototypeMethods: false }],
    'style/yield-star-spacing': ['error', { before: false, after: true }],
    'style/indent-binary-ops': ['error', indent],
    'style/curly-newline': ['error', { consistent: true }],

    'antfu/consistent-list-newline': 'error',
    'antfu/top-level-function': 'error',
    'antfu/consistent-chaining': ['error', { allowLeadingPropertyAccess: true }],
  }
}


function typescriptRules(config: FilledStylisticConfig): TypedFlatConfigItem['rules'] {
  return {
    'style/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: config.semi ? 'semi' : 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    'style/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
    'style/type-generic-spacing': 'error',
    'style/type-named-tuple-spacing': 'error',
  }
}


function jsxRules(
  config: FilledStylisticConfig,
  otherOptions: Pick<Exclude<NonNullable<OptionsConfig['stylistic']>, boolean>, 'jsxPascalCaseIgnore'>,
): TypedFlatConfigItem['rules'] {
  return {
    'style/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'style/jsx-closing-tag-location': ['error', 'tag-aligned'],
    'style/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'style/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
    'style/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
        allowMultiline: false,
        attributes: true,
      },
    ],
    'style/jsx-equals-spacing': ['error', 'never'],
    'style/jsx-first-prop-new-line': ['error', 'multiline'],
    'style/jsx-function-call-newline': ['error', 'multiline'],
    'style/jsx-indent-props': ['error', config.indent],
    'style/jsx-max-props-per-line': ['error', { maximum: { single: 3, multi: 1 } }],
    'style/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowLeadingUnderscore: false,
        allowNamespace: true,
        ignore: otherOptions.jsxPascalCaseIgnore ?? [],
      },
    ],
    'style/jsx-props-no-multi-spaces': 'error',
    'style/jsx-self-closing-comp': ['error', { html: true, component: true }],
    'style/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto',
      },
    ],
    'style/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'style/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        'return': 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
  }
}


export async function stylistic(options: OptionsConfig['stylistic'] = {}): Promise<TypedFlatConfigItem[]> {

  const config = resolveStylisticConfig(options)

  if (!config)
    return []


  const overrides = typeof options === 'boolean' ? {} : options.overrides

  const otherOptions = typeof options === 'boolean'
    ? {}
    : { jsxPascalCaseIgnore: options.jsxPascalCaseIgnore }


  const [
    pluginStylistic,
    pluginAntfu,
  ] = await Promise.all([
    interopDefault(import('@stylistic/eslint-plugin')),
    interopDefault(import('eslint-plugin-antfu')),
  ])


  return [
    {
      name: 'aelita:stylistic:setup',
      plugins: {
        style: pluginStylistic,
        antfu: pluginAntfu,
      },
    },
    {
      name: 'aelita:stylistic:rules:js-ts-shared',
      rules: jsTsSharedRules(config),
    },
    {
      name: 'aelita:stylistic:rules:typescript',
      rules: typescriptRules(config),
    },
    {
      name: 'aelita:stylistic:rules:jsx',
      rules: jsxRules(config, otherOptions),
    },
    ...overrides
      ? [{
        name: 'aelita:stylistic:override:custom',
        rules: overrides,
      }]
      : [],
  ]
}
