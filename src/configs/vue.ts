import { mergeProcessors } from 'eslint-merge-processors'
import { GLOB_VUE } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import { resolveStylisticConfig } from './stylistic'
import type { OptionsStylistic, OptionsVue, TypedFlatConfigItem } from '../types'


function vueRules(eslintPlugin: any, options: OptionsVue): TypedFlatConfigItem['rules'] {
  return {
    ...eslintPlugin.configs.base.rules,
    ...eslintPlugin.configs['vue3-essential'].rules,
    ...eslintPlugin.configs['vue3-strongly-recommended'].rules,
    ...eslintPlugin.configs['vue3-recommended'].rules,


    // Uncategorized
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
        globals: options.globalComponents,
      },
    ],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/html-button-has-type': ['error', { button: true, submit: true, reset: true }],
    'vue/next-tick-style': ['error', 'promise'],
    'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: false }],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-ref-object-reactivity-loss': 'error',
    'vue/no-required-prop-with-default': ['error', { autofix: true }],
    'vue/no-restricted-v-bind': 'error',
    'vue/no-setup-props-reactivity-loss': 'error',
    'vue/no-static-inline-styles': ['warn', { allowBinding: false }],
    'vue/no-template-target-blank': ['error', { allowReferrer: false, enforceDynamicLinks: 'always' }],
    'vue/no-undef-components': [
      'error',
      {
        ignorePatterns: [
          ...options.globalComponents ?? [],
          ...options.extraGlobalComponentsWithRegex ?? [],
        ],
      },
    ],
    'vue/no-undef-properties': 'error',
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props'],
        deepData: false,
        ignorePublicMembers: false,
        unreferencedOptions: [],
      },
    ],
    'vue/no-unused-refs': 'error',
    'vue/no-use-v-else-with-v-for': 'error',
    'vue/no-useless-mustaches': ['error', { ignoreIncludesComment: false, ignoreStringEscape: false }],
    'vue/no-useless-v-bind': ['error', { ignoreIncludesComment: false, ignoreStringEscape: false }],
    'vue/no-v-text': 'error',
    'vue/prefer-define-options': 'error',
    'vue/prefer-prop-type-boolean-first': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/require-emit-validator': 'error',
    'vue/require-expose': 'error',
    'vue/require-macro-variable-name': [
      'error',
      {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs',
      },
    ],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/valid-define-options': 'error',
    'vue/no-unused-emit-declarations': 'error',

    // Extension Rules
    'vue/camelcase': [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: false,
        ignoreGlobals: false,
        allow: ['^_'],
      },
    ],
    'vue/dot-notation': ['error', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'vue/no-console': ['error', { allow: ['warn', 'error'] }],
    'vue/no-constant-condition': ['error', { checkLoops: false }],
    'vue/no-empty-pattern': ['error', { allowObjectPatternsAsParameters: false }],
    'vue/no-loss-of-precision': 'error',
    'vue/no-useless-concat': 'error',
    'vue/object-shorthand': ['error', 'always'],
    'vue/prefer-template': 'error',
  }
}


const vueTypeScriptRules: TypedFlatConfigItem['rules'] = {
  'vue/require-typed-object-prop': 'error',
  'vue/require-typed-ref': 'error',
}


function vueDefaultOverrideRules(options: NonNullable<OptionsVue['ruleOptions']>): TypedFlatConfigItem['rules'] {
  return {
    // Priority A: Essential
    'vue/multi-word-component-names': [
      'error',
      { ignores: options.multiWordComponentNames?.ignores },
    ],
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: true,
        disallowVue3BuiltInComponents: true,
      },
    ],
    'vue/no-shared-component-data': 'off',
    'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],

    // Priority B: Strongly Recommended
    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          'void': 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        allowEmptyLines: false,
        ignores: [],
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-slot-style': [
      'error',
      {
        'default': 'shorthand',
        named: 'shorthand',
        atComponent: 'shorthand',
      },
    ],
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true, ignore: [] }],

    // Priority C: Recommended
    'vue/order-in-components': 'off',
  }
}


function vueStylisticRules(options: Required<OptionsStylistic>): TypedFlatConfigItem['rules'] {
  return {
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'consistent',
        multiline: 'consistent',
        maxEmptyLines: 0,
        blocks: {
          template: {
            singleline: 'always',
            multiline: 'always',
          },
          script: {
            singleline: 'always',
            multiline: 'always',
          },
          style: {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 2,
          },
        },
      },
    ],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots', 'defineModel'],
        defineExposeLast: false,
      },
    ],
    'vue/html-comment-content-newline': ['error', { singleline: 'never', multiline: 'always' }],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/html-comment-indent': ['error', options.indent],
    'vue/html-indent': ['error', options.indent],
    'vue/padding-line-between-blocks': ['error', 'always'],

    'style/indent': 'off',
    'vue/script-indent': [
      'error',
      options.indent,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      },
    ],


    // Extension Rules
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/comma-dangle': ['error', options.commaDangle],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/comma-style': ['error', 'last'],
    'vue/dot-location': ['error', 'property'],
    'vue/func-call-spacing': ['error', 'never'],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/no-extra-parens': [
      'error',
      'all',
      {
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false,
      },
    ],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    'vue/quote-props': ['error', 'as-needed', { keywords: true }],
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    'vue/template-curly-spacing': ['error', 'never'],
  }
}


function vueAccessibilityRules(
  options: NonNullable<Exclude<OptionsVue['accessibility'], boolean>>,
): TypedFlatConfigItem['rules'] {
  const {
    altText,
    anchorHasContent,
    formControlHasLabel,
    headingHasContent,
    interactiveSupportsFocus,
    labelHasFor,
    mediaHasCaption,
    noAutofocus,
    noDistractingElements,
    noRedundantRoles,
  } = options

  return {
    'vue-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]', ...altText?.extraElements ?? []],
        ...altText?.elementMapping,
      },
    ],
    'vue-a11y/anchor-has-content': [
      'error',
      {
        components: anchorHasContent?.extraComponents,
        accessibleChildren: anchorHasContent?.accessibleChildren,
        accessibleDirectives: anchorHasContent?.accessibleDirectives,
      },
    ],
    'vue-a11y/aria-props': 'error',
    'vue-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    'vue-a11y/aria-unsupported-elements': 'error',
    'vue-a11y/click-events-have-key-events': 'error',
    'vue-a11y/form-control-has-label': [
      'error',
      {
        labelComponents: formControlHasLabel?.extraLabelComponents,
        controlComponents: formControlHasLabel?.extraControlComponents,
      },
    ],
    'vue-a11y/heading-has-content': [
      'error',
      {
        components: headingHasContent?.extraComponents,
        accessibleChildren: headingHasContent?.accessibleChildren,
        accessibleDirectives: headingHasContent?.accessibleDirectives,
      },
    ],
    'vue-a11y/iframe-has-title': 'error',
    'vue-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: [
          'button',
          'checkbox',
          'link',
          'searchbox',
          'spinbutton',
          'switch',
          'textbox',
          ...interactiveSupportsFocus?.extraTabbableElements ?? [],
        ],
      },
    ],
    'vue-a11y/label-has-for': [
      'error',
      {
        components: labelHasFor?.extraComponents,
        controlComponents: labelHasFor?.extraControlComponents,
        required: labelHasFor?.required ?? { every: ['nesting', 'id'] },
        allowChildren: labelHasFor?.allowChildren ?? false,
      },
    ],
    'vue-a11y/media-has-caption': ['error', { ...mediaHasCaption }],
    'vue-a11y/mouse-events-have-key-events': 'error',
    'vue-a11y/no-access-key': 'error',
    ...noAutofocus && { 'vue-a11y/no-autofocus': ['error', { ignoreNonDOM: true }] },
    'vue-a11y/no-distracting-elements': [
      'error',
      { elements: ['marquee', 'blink', ...noDistractingElements?.extraDistractingElements ?? []] },
    ],
    'vue-a11y/no-redundant-roles': ['error', noRedundantRoles?.extraExceptions ?? {}],
    'vue-a11y/no-static-element-interactions': 'error',
    'vue-a11y/role-has-required-aria-props': 'error',
    'vue-a11y/tabindex-no-positive': 'error',
    'vue-a11y/no-aria-hidden-on-focusable': 'error',
    'vue-a11y/no-role-presentation-on-focusable': 'error',
  }
}


export async function vue(options: OptionsVue = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files = [GLOB_VUE],
    typescript = false,
    accessibility = {},
    overrides = {},
    a11yOverrides = {},
    ruleOptions = {},
    stylistic: _stylistic = true,
    sfcBlocks: _sfcBlocks,
  } = options


  const stylistic = resolveStylisticConfig(_stylistic)


  const sfcBlocks = _sfcBlocks === true
    ? {}
    : _sfcBlocks ?? {}


  await ensurePackages([
    'eslint-plugin-vue',
    'vue-eslint-parser',
    ...accessibility ? ['eslint-plugin-vuejs-accessibility'] : [],
    ...sfcBlocks ? ['eslint-processor-vue-blocks'] : [],
  ])


  const [pluginVue, parserVue] = await Promise.all([
    // @ts-expect-error - no dts file available
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
  ] as const)


  return [
    {
      name: 'aelita:vue:setup',
      plugins: {
        vue: pluginVue,
        ...accessibility && {
          'vue-a11y': await interopDefault(import('eslint-plugin-vuejs-accessibility')),
        },
      },
      // This allows Vue plugin to work with auto imports
      // https://github.com/vuejs/eslint-plugin-vue/pull/2422
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
    },
    {
      name: 'aelita:vue:rules',
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 'latest',
          sourceType: 'module',
          vueFeatures: {
            filter: false,
            interpolationAsNonHTML: true,
            styleCSSVariableInjection: true,
            customMacros: [],
          },
          extraFileExtensions: ['.vue'],
          parser: typescript ? (await import('typescript-eslint')).parser : void 0,
        },
      },
      processor: sfcBlocks
        ? mergeProcessors([
          pluginVue.processors['.vue'],
          (await interopDefault(import('eslint-processor-vue-blocks')))({
            ...sfcBlocks,
            blocks: {
              styles: true,
              ...sfcBlocks.blocks,
            },
          }),
        ])
        : pluginVue.processors['.vue'],
      rules: {
        ...vueRules(pluginVue, options),
        ...vueDefaultOverrideRules(ruleOptions),
        ...typescript && vueTypeScriptRules,
        ...stylistic && vueStylisticRules(stylistic),

        ...overrides,
        ...accessibility && a11yOverrides,
      },
    },
    ...accessibility
      ? [{
        name: 'aelita:vue:rules:accessibility',
        files,
        rules: {
          ...vueAccessibilityRules(typeof accessibility === 'boolean' ? {} : accessibility),
          ...a11yOverrides,
        },
      }]
      : [],
  ]
}
