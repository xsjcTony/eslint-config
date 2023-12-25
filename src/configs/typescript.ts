import { cwd as processCwd } from 'node:process'
import { GLOB_DTS, GLOB_SRC } from '../globs'
import { interopDefault, toArray } from '../utils'
import type {
  FlatConfigItem,
  OptionsComponentExtensions,
  OptionsConfig,
  OptionsFiles,
  OptionsTypeScriptParserOptionsOverride,
  OptionsTypeScriptWithTypes
} from '../types'


type TypescriptOptions =
  & OptionsComponentExtensions
  & OptionsFiles
  & OptionsTypeScriptWithTypes
  & OptionsTypeScriptParserOptionsOverride
  & {
    overrides?: NonNullable<OptionsConfig['overrides']>['typescript']
    projectType?: 'app' | 'lib'
  }


const typescriptRules = (projectType: TypescriptOptions['projectType']): FlatConfigItem['rules'] => ({
  'ts/adjacent-overload-signatures': 'error',
  'ts/array-type': ['error', { 'default': 'array', readonly: 'array' }],
  'ts/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
      'ts-check': false,
      minimumDescriptionLength: 2
    }
  ],
  'ts/ban-types': [
    'error',
    {
      types: {
        String: {
          message: 'Use string instead',
          fixWith: 'string'
        },
        Boolean: {
          message: 'Use boolean instead',
          fixWith: 'boolean'
        },
        Number: {
          message: 'Use number instead',
          fixWith: 'number'
        },
        Symbol: {
          message: 'Use symbol instead',
          fixWith: 'symbol'
        },

        Function: {
          message: [
            'The `Function` type accepts any function-like value.',
            'It provides no type safety when calling the function, which can be a common source of bugs.',
            'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
            'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.'
          ].join('\n')
        },

        // object typing
        Object: {
          message: [
            'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
            '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
            '- If you want a type meaning "any value", you probably want `unknown` instead.'
          ].join('\n')
        }
      },
      extendDefaults: false
    }
  ],

  'ts/consistent-indexed-object-style': ['error', 'record'],
  'ts/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter'
    }
  ],
  'ts/consistent-type-definitions': ['error', projectType === 'app' ? 'type' : 'interface'],
  'ts/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports'
    }
  ],

  'default-param-last': 'off',
  'ts/default-param-last': 'error',

  'ts/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      allowFunctionsWithoutTypeParameters: false,
      allowIIFEs: false,
      allowedNames: []
    }
  ],
  'ts/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

  'ts/method-signature-style': ['error', 'property'],

  'no-array-constructor': 'off',
  'ts/no-array-constructor': 'error',

  'ts/no-confusing-non-null-assertion': 'error',

  'no-dupe-class-members': 'off',

  'no-empty-function': 'off',
  'ts/no-empty-function': ['error', { allow: ['decoratedFunctions'] }],

  'ts/no-empty-interface': ['error', { allowSingleExtends: true }],
  'ts/no-extra-non-null-assertion': 'error',

  'no-extra-semi': 'off',
  'ts/no-extra-semi': 'error',

  'ts/no-extraneous-class': 'error',
  'ts/no-inferrable-types': [
    'error',
    {
      ignoreParameters: false,
      ignoreProperties: false
    }
  ],

  'no-invalid-this': 'off',

  'ts/no-invalid-void-type': [
    'error',
    {
      allowInGenericTypeArguments: true,
      allowAsThisParameter: true
    }
  ],

  'no-loop-func': 'off',
  'ts/no-loop-func': 'error',

  'no-loss-of-precision': 'off',
  'ts/no-loss-of-precision': 'error',

  'ts/no-misused-new': 'error',
  'ts/no-namespace': [
    'error',
    {
      allowDeclarations: true,
      allowDefinitionFiles: true
    }
  ],
  'ts/no-non-null-assertion': 'warn',

  'no-redeclare': 'off',

  'ts/no-require-imports': 'error',
  'ts/no-this-alias': [
    'error',
    {
      allowDestructuring: true,
      allowedNames: []
    }
  ],

  'no-unused-vars': 'off',
  'ts/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: true,
      destructuredArrayIgnorePattern: '^_'
    }
  ],

  'no-useless-constructor': 'off',
  'ts/no-useless-constructor': 'error',

  'ts/no-useless-empty-export': 'error',
  'ts/parameter-properties': ['error', { prefer: 'class-property', allow: [] }],
  'ts/prefer-as-const': 'error',
  'ts/prefer-for-of': 'error',
  'ts/prefer-function-type': 'error',
  'ts/prefer-ts-expect-error': 'error',
  'ts/sort-type-constituents': [
    'error',
    {
      checkIntersections: true,
      checkUnions: true,
      groupOrder: [
        'named',
        'keyword',
        'operator',
        'literal',
        'function',
        'import',
        'conditional',
        'object',
        'tuple',
        'intersection',
        'union',
        'nullish'
      ]
    }
  ],
  'ts/triple-slash-reference': [
    'error',
    {
      path: 'never',
      types: 'prefer-import',
      lib: 'never'
    }
  ],
  'ts/unified-signatures': 'error'
})


const typeAwareTypescriptRules: FlatConfigItem['rules'] = {
  'ts/await-thenable': 'error',
  'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],

  'dot-notation': 'off',
  'ts/dot-notation': [
    'error',
    {
      allowKeywords: true,
      allowPrivateClassPropertyAccess: false,
      allowProtectedClassPropertyAccess: false,
      allowIndexSignaturePropertyAccess: false
    }
  ],

  'ts/no-confusing-void-expression': [
    'error',
    {
      ignoreArrowShorthand: false,
      ignoreVoidOperator: true
    }
  ],
  'ts/no-duplicate-type-constituents': [
    'error',
    {
      ignoreIntersections: false,
      ignoreUnions: false
    }
  ],
  'ts/no-floating-promises': ['error', { ignoreVoid: true, ignoreIIFE: false }],
  'ts/no-for-in-array': 'error',
  'ts/no-implied-eval': 'error',
  'ts/no-misused-promises': [
    'error',
    {
      checksConditionals: true,
      checksVoidReturn: false,
      checksSpreads: true
    }
  ],
  'ts/no-throw-literal': [
    'error',
    {
      allowThrowingAny: false,
      allowThrowingUnknown: false
    }
  ],
  'ts/no-unnecessary-boolean-literal-compare': [
    'error',
    {
      allowComparingNullableBooleansToTrue: false,
      allowComparingNullableBooleansToFalse: false
    }
  ],
  'ts/no-unnecessary-condition': [
    'error',
    {
      allowConstantLoopConditions: true,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
    }
  ],
  'ts/no-unnecessary-qualifier': 'error',
  'ts/no-unnecessary-type-assertion': 'error',
  'ts/no-unnecessary-type-constraint': 'error',
  'ts/no-unsafe-unary-minus': 'error',
  'ts/prefer-includes': 'error',
  'ts/prefer-nullish-coalescing': [
    'error',
    {
      ignoreTernaryTests: true,
      ignoreConditionalTests: true,
      ignoreMixedLogicalExpressions: true,
      ignorePrimitives: {
        'boolean': true,
        number: true,
        string: true
      }
    }
  ],
  'ts/prefer-optional-chain': 'error',
  'ts/prefer-reduce-type-parameter': 'error',
  'ts/prefer-regexp-exec': 'error',
  'ts/prefer-return-this-type': 'error',
  'ts/prefer-string-starts-ends-with': 'error',
  'ts/promise-function-async': [
    'error',
    {
      allowAny: true,
      checkArrowFunctions: true,
      checkFunctionDeclarations: true,
      checkFunctionExpressions: true,
      checkMethodDeclarations: true,
      allowedPromiseNames: []
    }
  ],
  'ts/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  'ts/require-await': 'error',
  'ts/restrict-plus-operands': [
    'error',
    {
      skipCompoundAssignments: false,
      allowAny: false,
      allowBoolean: false,
      allowNullish: false,
      allowRegExp: false,
      allowNumberAndString: false
    }
  ],
  'ts/restrict-template-expressions': [
    'error',
    {
      allowAny: false,
      allowNumber: true,
      allowBoolean: false,
      allowRegExp: false,
      allowNullish: false,
      allowNever: false
    }
  ],
  'ts/return-await': ['error', 'always'],
  // @ts-expect-error - type definition is not up-to-date
  'ts/switch-exhaustiveness-check': ['error', { requireDefaultForNonUnion: true }],
  'ts/unbound-method': ['error', { ignoreStatic: false }]
}


const typescriptStylisticRules: FlatConfigItem['rules'] = {
  'block-spacing': 'off',
  'ts/block-spacing': ['error', 'always'],

  'brace-style': 'off',
  'ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],

  'comma-dangle': 'off',
  'ts/comma-dangle': ['error', 'never'],

  'comma-spacing': 'off',
  'ts/comma-spacing': ['error', { before: false, after: true }],

  'func-call-spacing': 'off',
  'ts/func-call-spacing': ['error', 'never'],

  'key-spacing': 'off',
  'ts/key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict'
    }
  ],

  'keyword-spacing': 'off',
  'ts/keyword-spacing': ['error', { before: true, after: true }],

  'lines-between-class-members': 'off',
  'ts/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
      exceptAfterOverload: true
    }
  ],

  'ts/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'none',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      },
      multilineDetection: 'brackets'
    }
  ],

  'no-extra-parens': 'off',
  'ts/no-extra-parens': [
    'error',
    'all',
    {
      ignoreJSX: 'multi-line',
      nestedBinaryExpressions: false
    }
  ],

  'object-curly-spacing': 'off',
  'ts/object-curly-spacing': ['error', 'always'],

  'padding-line-between-statements': 'off',
  'ts/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: ['class', 'function', 'iife', 'interface'] },
    { blankLine: 'always', prev: ['class', 'function', 'iife', 'interface'], next: '*' }
  ],

  quotes: 'off',
  'ts/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

  semi: 'off',
  'ts/semi': ['error', 'never'],

  'space-before-blocks': 'off',
  'ts/space-before-blocks': ['error', 'always'],

  'space-before-function-paren': 'off',
  'ts/space-before-function-paren': [
    'error',
    {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }
  ],

  'space-infix-ops': 'off',
  'ts/space-infix-ops': ['error', { int32Hint: false }],

  'ts/type-annotation-spacing': [
    'error',
    {
      before: false,
      after: true,
      overrides: {
        arrow: {
          before: true,
          after: true
        }
      }
    }
  ],
  'ts/no-useless-template-literals': 'error'
}


export const typescript = async ({
  componentExtensions = [],
  files,
  tsconfigPath,
  parserOptionsOverride = {},
  overrides = {},
  projectType = 'app'
}: TypescriptOptions = {}): Promise<FlatConfigItem[]> => {

  const [pluginTypescript, parserTypescript] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser'))
  ] as const)


  return [
    {
      name: 'aelita:typescript:setup',
      plugins: {
        ts: pluginTypescript
      }
    },
    {
      name: 'aelita:typescript',
      files: files ?? [
        GLOB_SRC,
        ...componentExtensions.map(ext => `**/*.${ext}`)
      ],
      languageOptions: {
        parser: parserTypescript,
        parserOptions: {
          // https://github.com/antfu/eslint-config/issues/320
          // @ts-expect-error - type conflict in `parserOptions` interface
          ecmaVersion: 'latest',
          // @ts-expect-error - type conflict in `parserOptions` interface
          ecmaFeatures: { jsx: true },
          // @ts-expect-error - type conflict in `parserOptions` interface
          sourceType: 'module',
          // @ts-expect-error - type does not contain `null`
          jsxPragma: null,
          extraFileExtensions: componentExtensions.map(ext => `.${ext}`),
          ...tsconfigPath && {
            project: toArray(tsconfigPath),
            tsconfigRootDir: processCwd()
          },
          ...parserOptionsOverride
        }
      },
      rules: {
        ...typescriptRules(projectType),
        ...typescriptStylisticRules,
        ...tsconfigPath && typeAwareTypescriptRules,
        ...overrides
      }
    },
    {
      name: 'aelita:typescript:dts-overrides',
      files: [GLOB_DTS],
      rules: {
        'ts/no-unused-vars': 'off',
        'ts/consistent-indexed-object-style': 'off'
      }
    },
    {
      name: 'aelita:typescript:test-overrides',
      files: ['**/*.{test,spec}.ts?(x)'],
      rules: {
        'ts/no-empty-function': 'off'
      }
    },
    {
      name: 'aelita:typescript:javascript-overrides',
      files: ['**/*.?(c)js'],
      rules: {
        'ts/no-require-imports': 'off'
      }
    }
  ]
}
