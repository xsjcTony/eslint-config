import { cwd } from 'node:process'
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from '../globs'
import { interopDefault } from '../utils'
import type { OptionsTypeScript, TypedFlatConfigItem } from '../types'
import type { Linter } from 'eslint'


function typescriptRules(
  projectType: NonNullable<OptionsTypeScript['projectType']>,
): TypedFlatConfigItem['rules'] {
  return {
    'ts/adjacent-overload-signatures': 'error',
    'ts/array-type': ['error', { 'default': 'array', readonly: 'array' }],
    'ts/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 2,
      },
    ],
    'ts/no-unsafe-function-type': 'error',
    'ts/no-wrapper-object-types': 'error',
    'ts/consistent-indexed-object-style': ['error', 'record'],
    'ts/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    'ts/consistent-type-definitions': ['error', projectType === 'app' ? 'type' : 'interface'],
    'ts/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
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
        allowedNames: [],
      },
    ],
    'ts/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],

    'ts/method-signature-style': ['error', 'property'],

    'no-array-constructor': 'off',
    'ts/no-array-constructor': 'error',

    'ts/no-confusing-non-null-assertion': 'error',

    'no-dupe-class-members': 'off',

    'no-empty-function': 'off',
    'ts/no-empty-function': ['error', { allow: ['decoratedFunctions'] }],

    'ts/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
        allowObjectTypes: 'always',
      },
    ],
    'ts/no-extra-non-null-assertion': 'error',
    'ts/no-extraneous-class': 'error',
    'ts/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],

    'no-invalid-this': 'off',

    'ts/no-invalid-void-type': [
      'error',
      {
        allowInGenericTypeArguments: true,
        allowAsThisParameter: true,
      },
    ],

    'no-loop-func': 'off',
    'ts/no-loop-func': 'error',

    'ts/no-misused-new': 'error',
    'ts/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    'ts/no-non-null-assertion': 'warn',

    'no-redeclare': 'off',

    'ts/no-require-imports': 'error',
    'ts/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: [],
      },
    ],

    'no-useless-constructor': 'off',
    'ts/no-useless-constructor': 'error',

    'ts/no-useless-empty-export': 'error',
    'ts/parameter-properties': ['error', { prefer: 'class-property', allow: [] }],
    'ts/prefer-as-const': 'error',
    'ts/prefer-for-of': 'error',
    'ts/prefer-function-type': 'error',
    'ts/sort-type-constituents': projectType === 'lib'
      ? 'off'
      : [
        'error',
        {
          caseSensitive: true,
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
            'nullish',
          ],
        },
      ],
    'ts/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'prefer-import',
        lib: 'never',
      },
    ],
    'ts/unified-signatures': 'error',

    'no-undef': 'off',
  }
}


const typeAwareRules: TypedFlatConfigItem['rules'] = {
  'ts/await-thenable': 'error',
  'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],

  'dot-notation': 'off',
  'ts/dot-notation': [
    'error',
    {
      allowKeywords: true,
      allowPrivateClassPropertyAccess: false,
      allowProtectedClassPropertyAccess: false,
      allowIndexSignaturePropertyAccess: false,
    },
  ],

  'ts/no-confusing-void-expression': [
    'error',
    {
      ignoreArrowShorthand: false,
      ignoreVoidOperator: true,
    },
  ],
  'ts/no-duplicate-type-constituents': [
    'error',
    {
      ignoreIntersections: false,
      ignoreUnions: false,
    },
  ],
  'ts/no-floating-promises': ['error', { checkThenables: false, ignoreVoid: true, ignoreIIFE: false }],
  'ts/no-for-in-array': 'error',
  'ts/no-implied-eval': 'error',
  'ts/no-misused-promises': [
    'error',
    {
      checksConditionals: true,
      checksVoidReturn: false,
      checksSpreads: true,
    },
  ],
  'ts/no-unnecessary-boolean-literal-compare': [
    'error',
    {
      allowComparingNullableBooleansToTrue: false,
      allowComparingNullableBooleansToFalse: false,
    },
  ],
  'ts/no-unnecessary-condition': [
    'error',
    {
      allowConstantLoopConditions: true,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
    },
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
        string: true,
      },
    },
  ],
  'ts/prefer-optional-chain': 'error',
  'ts/prefer-reduce-type-parameter': 'error',
  'ts/prefer-regexp-exec': 'error',
  'ts/prefer-return-this-type': 'error',
  'ts/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'never' }],
  'ts/promise-function-async': [
    'error',
    {
      allowAny: true,
      checkArrowFunctions: true,
      checkFunctionDeclarations: true,
      checkFunctionExpressions: true,
      checkMethodDeclarations: true,
      allowedPromiseNames: [],
    },
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
      allowNumberAndString: false,
    },
  ],
  'ts/restrict-template-expressions': [
    'error',
    {
      allowAny: false,
      allowNumber: true,
      allowBoolean: false,
      allowRegExp: false,
      allowNullish: false,
      allowNever: false,
    },
  ],
  'ts/return-await': ['error', 'always'],
  'ts/switch-exhaustiveness-check': [
    'error',
    {
      requireDefaultForNonUnion: true,
      allowDefaultCaseForExhaustiveSwitch: false,
    },
  ],
  'ts/unbound-method': ['error', { ignoreStatic: false }],
  'ts/prefer-find': 'error',
  'ts/no-unnecessary-template-expression': 'error',
  'ts/only-throw-error': ['error', { allowThrowingAny: false, allowThrowingUnknown: false }],
  'ts/no-deprecated': 'warn',
}


export async function typescript(options: OptionsTypeScript = {}): Promise<TypedFlatConfigItem[]> {

  const {
    componentExts = [],
    overrides,
    parserOptions = {},
    enableTypeAwareRules = true,
    projectType = 'app',
    projectService,
  } = options


  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]


  const {
    parser: parserTypescript,
    plugin: pluginTypescript,
  } = await interopDefault(import('typescript-eslint'))


  return [
    {
      name: 'aelita:typescript:setup',
      plugins: {
        ts: pluginTypescript,
      },
    },
    {
      name: 'aelita:typescript:rules',
      files,
      languageOptions: {
        parser: parserTypescript as Linter.Parser,
        parserOptions: {
          ecmaVersion: 'latest',
          ecmaFeatures: { jsx: true },
          sourceType: 'module',
          jsxPragma: null,
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          ...enableTypeAwareRules && {
            projectService: projectService ?? true,
            tsconfigRootDir: cwd(),
          },
          ...parserOptions,
        },
      },
      rules: typescriptRules(projectType),
    },
    ...enableTypeAwareRules
      ? [{
        name: 'aelita:typescript:rules:type-aware',
        files,
        rules: typeAwareRules,
      }]
      : [],
    ...overrides
      ? [{
        name: 'aelita:typescript:override:custom',
        rules: overrides,
      }]
      : [],
    {
      name: 'aelita:typescript:override:tsx',
      files: [GLOB_TSX],
      rules: {
        'ts/no-unnecessary-type-constraint': 'off',
      },
    },
    {
      name: 'aelita:typescript:override:dts',
      files: [GLOB_DTS],
      rules: {
        'ts/consistent-indexed-object-style': 'off',
        'ts/consistent-type-definitions': 'off',
        'ts/no-empty-object-type': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: 'aelita:typescript:override:test',
      files: ['**/*.{test,spec}.ts?(x)'],
      rules: {
        'ts/no-empty-function': 'off',
      },
    },
    {
      name: 'aelita:typescript:override:cjs',
      files: ['**/*.?(c)ts'],
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
  ]
}
