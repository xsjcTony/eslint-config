import { GLOB_VUE } from '../globs'
import { parserVue, parserTypescript } from '../parsers'
import { pluginVue } from '../plugins'
import type { ConfigItem, OptionsConfig, OptionsHasTypeScript, OptionsVue } from '../types'


interface VueOptions extends OptionsHasTypeScript, OptionsVue {
  overrides?: NonNullable<OptionsConfig['overrides']>['vue']
}


const vueRules = ({ globalComponents }: OptionsVue): ConfigItem['rules'] => ({
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs['vue3-essential'].rules,
  ...pluginVue.configs['vue3-strongly-recommended'].rules,
  ...pluginVue.configs['vue3-recommended'].rules,

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
  'vue/component-api-style': ['error', ['script-setup', 'composition']],
  'vue/component-name-in-template-casing': [
    'error',
    'PascalCase',
    {
      registeredComponentsOnly: true,
      ignores: [],
      globals: globalComponents
    }
  ],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/define-emits-declaration': ['error', 'type-based'],
  'vue/define-macros-order': [
    'error',
    ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots', 'defineExpose']
  ],
  'vue/define-props-declaration': ['error', 'type-based']
})


const vueDefaultOverrideRules: ConfigItem['rules'] = {

}


const vueStylisticRules: ConfigItem['rules'] = {

}


export const vue = ({ typescript = false, overrides }: VueOptions): ConfigItem[] => [
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
      ...vueRules,
      ...overrides
    }
  }
]
