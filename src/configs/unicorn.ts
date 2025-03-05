import type { OptionsUnicorn, TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'


function unicornRules(options: OptionsUnicorn): TypedFlatConfigItem['rules'] {
  const { typescript = false } = options

  return {
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-anonymous-default-export': 'error',
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/no-array-for-each': 'error',
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-array-push-push': 'error',
    'unicorn/no-await-in-promise-methods': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-document-cookie': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-instanceof-builtins': ['error', { strategy: 'loose' }],
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-lonely-if': 'error',
    'unicorn/no-negated-condition': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/no-single-promise-in-promise-methods': 'error',
    'unicorn/no-thenable': 'error',
    'unicorn/no-this-assignment': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/no-useless-promise-resolve-reject': 'error',
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-at': ['error', { checkAllIndexAccess: false }],
    'unicorn/prefer-blob-reading-methods': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-dataset': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
    'unicorn/prefer-includes': typescript ? 'off' : 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-math-trunc': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-native-coercion-functions': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-prototype-methods': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-set-size': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-starts-ends-with': typescript ? 'off' : 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-switch': ['error', { minimumCases: 2, emptyDefaultCase: 'do-nothing-comment' }],
    'unicorn/prefer-ternary': ['error', 'always'],
    'unicorn/prefer-top-level-await': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/relative-url-style': ['error', 'never'],
    'unicorn/require-array-join-separator': 'error',
    'unicorn/require-number-to-fixed-digits-argument': 'error',
    'unicorn/switch-case-braces': ['error', 'always'],
    'unicorn/text-encoding-identifier-case': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/no-magic-array-flat-depth': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/no-invalid-fetch-options': 'error',
    'unicorn/prefer-string-raw': 'error',
    'unicorn/no-negation-in-equality-check': 'error',
    'unicorn/no-length-as-slice-end': 'error',
    'unicorn/prefer-global-this': 'error',
    'unicorn/prefer-math-min-max': 'error',
    'unicorn/consistent-existence-index-check': 'error',
  }
}


export async function unicorn(options: OptionsUnicorn = {}): Promise<TypedFlatConfigItem[]> {

  const { overrides } = options


  return [
    {
      name: 'aelita:unicorn:setup',
      plugins: {
        unicorn: await interopDefault(import('eslint-plugin-unicorn')),
      },
    },
    {
      name: 'aelita:unicorn:rules',
      rules: unicornRules(options),
    },
    ...overrides
      ? [{
        name: 'aelita:unicorn:override:custom',
        rules: overrides,
      }]
      : [],
  ]
}
