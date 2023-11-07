import { GLOB_SRC } from '../globs'
import { pluginJsxA11y, pluginReact, pluginReactHooks } from '../plugins'
import type { ConfigItem, OptionsReact } from '../types'


const reactRules = (ruleOptions: NonNullable<OptionsReact['ruleOptions']>): ConfigItem['rules'] => ({
  'react/boolean-prop-naming': [
    'warn',
    {
      rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      message: 'BOOLEAN prop ({{ propName }}) should start with "is" or "has" and use camelCase',
      validateNested: false,
      propTypeNames: ruleOptions.extraPropTypeNames
    }
  ],
  'react/button-has-type': ['error', { button: true, submit: true, reset: true }],
  'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
  'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
  'react/display-name': ['error', { ignoreTranspilerName: false, checkContextObjects: false }],
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }
  ],
  'react/hook-use-state': ['error', { allowDestructuredState: true }]
})


const jsxRules = ({ ruleOptions }: NonNullable<OptionsReact['ruleOptions']>): ConfigItem['rules'] => ({

})


const reactTypeScriptRules: ConfigItem['rules'] = {

}


const reactStylisticRules: ConfigItem['rules'] = {

}


const jsxStylisticRules: ConfigItem['rules'] = {

}


const reactAccessibilityRules = ({

}: NonNullable<Exclude<OptionsReact['accessibility'], false>>): ConfigItem['rules'] => ({

})


export const react = (options: OptionsReact = {}): ConfigItem[] => {
  const {
    typescript = false,
    ruleOptions = {},
    accessibility = {},
    overrides
  } = options

  return [
    {
      name: 'aelita:react:setup',
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        ...!!accessibility && { 'jsx-a11y': pluginJsxA11y }
      }
    },
    {
      name: 'aelita:react',
      files: [GLOB_SRC],
      settings: {
        react: {
          version: 'detect',
          ...options.settings
        },
        propWrapperFunctions: options.propWrapperFunctions,
        componentWrapperFunctions: options.componentWrapperFunctions,
        formComponents: options.formComponents,
        linkComponents: options.linkComponents
      },
      rules: {
        ...reactRules(ruleOptions),
        ...jsxRules(ruleOptions),
        ...typescript && reactTypeScriptRules,
        ...reactStylisticRules,
        ...jsxStylisticRules,
        ...!!accessibility && reactAccessibilityRules(accessibility),
        ...overrides,
        ...!!accessibility && overrides?.accessibility
      }
    }
  ]
}
