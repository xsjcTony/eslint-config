import { GLOB_VUE } from '../globs'
import { parserVue, parserTypescript } from '../parsers'
import { pluginVue } from '../plugins'
import type { ConfigItem, OptionsConfig, OptionsHasTypeScript, OptionsVue } from '../types'


interface VueOptions extends OptionsHasTypeScript, OptionsVue {
  overrides?: NonNullable<OptionsConfig['overrides']>['vue']
}


const vueRules = (options: OptionsVue): ConfigItem['rules'] => ({
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs['vue3-essential'].rules,
  ...pluginVue.configs['vue3-strongly-recommended'].rules,
  ...pluginVue.configs['vue3-recommended'].rules,


  'vue/component-api-style': ['error', ['script-setup', 'composition']],
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      registeredComponentsOnly: true,
      ignores: [],
      globals: options.globalComponents
    }
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
  'vue/no-restricted-block': options.restrictedBlocks?.length
    ? ['error', ...options.restrictedBlocks]
    : 'off',
  'vue/no-restricted-html-elements': options.restrictedElements?.length
    ? ['error', ...options.restrictedElements]
    : 'off',
  'vue/no-restricted-v-bind': 'error',
  'vue/no-root-v-if': 'error',
  'vue/no-setup-props-reactivity-loss': 'error',
  'vue/no-static-inline-styles': ['warn', { allowBinding: false }],
  'vue/no-template-target-blank': ['error', { allowReferrer: false, enforceDynamicLinks: 'always' }],
  'vue/no-undef-components': [
    'error',
    {
      ignorePatterns: [
        ...options.globalComponents ?? [],
        ...options.extraGlobalComponentsWithRegex ?? []
      ]
    }
  ],
  'vue/no-undef-properties': 'error',
  'vue/no-unused-properties': [
    'error',
    {
      groups: ['props'],
      deepData: false,
      ignorePublicMembers: false,
      unreferencedOptions: []
    }
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
      useAttrs: 'attrs'
    }
  ],
  'vue/v-for-delimiter-style': ['error', 'in'],
  'vue/v-on-handler-style': ['error', ['method', 'inline-function'], { ignoreIncludesComment: false }],
  'vue/valid-define-options': 'error'
})


const vueTypeScriptRules: ConfigItem['rules'] = {
  'vue/require-typed-object-prop': 'error',
  'vue/require-typed-ref': 'error'
}


const vueDefaultOverrideRules: ConfigItem['rules'] = {

}


const vueStylisticRules: ConfigItem['rules'] = {
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
          multiline: 'always'
        },
        script: {
          singleline: 'always',
          multiline: 'always'
        },
        style: {
          singleline: 'always',
          multiline: 'always',
          maxEmptyLines: 2
        }
      }
    }
  ],
  'vue/define-macros-order': [
    'error',
    { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }
  ],
  'vue/html-comment-content-newline': ['error', { singleline: 'never', multiline: 'always' }],
  'vue/html-comment-content-spacing': ['error', 'always'],
  'vue/html-comment-indent': ['error', 2],
  'vue/padding-line-between-blocks': ['error', 'always'],

  indent: 'off',
  'vue/script-indent': [
    'error',
    2,
    {
      baseIndent: 0,
      switchCase: 1,
      ignores: []
    }
  ]
}


export const vue = (options: VueOptions = {}): ConfigItem[] => {
  const { typescript = false, overrides } = options

  return [
    {
      name: 'aelita:vue:setup',
      plugins: {
        vue: pluginVue
      }
    },
    {
      name: 'aelita:vue',
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: 'latest',
          sourceType: 'module',
          vueFeatures: {
            filter: false,
            interpolationAsNonHTML: true,
            // @ts-expect-error - type definition is not up-to-date
            styleCSSVariableInjection: true,
            customMacros: []
          },
          extraFileExtensions: ['.vue'],
          // @ts-expect-error - type definition issue with `parserOptions.parser`
          parser: typescript ? parserTypescript : void 0
        }
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...vueRules(options),
        ...typescript && vueTypeScriptRules,
        ...vueDefaultOverrideRules,
        ...vueStylisticRules,
        ...overrides
      }
    }
  ]
}
