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
      propTypeNames: ruleOptions.booleanPropNaming?.extraPropTypeNames
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
  'react/hook-use-state': ['error', { allowDestructuredState: true }],
  'react/no-array-index-key': 'warn',
  'react/no-children-prop': ['error', { allowFunctions: false }],
  'react/no-danger': 'warn',
  'react/no-danger-with-children': 'error',
  'react/no-deprecated': 'error',
  'react/no-multi-comp': ['error', { ignoreStateless: true }],
  'react/no-object-type-as-default-prop': 'error',
  'react/no-string-refs': ['error', { noTemplateLiterals: true }],
  'react/no-this-in-sfc': 'error',
  'react/no-typos': 'error',
  'react/no-unescaped-entities': [
    'error',
    {
      forbid: [
        {
          'char': '>',
          alternatives: ['&gt;']
        },
        {
          'char': '"',
          alternatives: ['&quot;']
        },
        {
          'char': '\'',
          alternatives: ['&apos;']
        },
        {
          'char': '}',
          alternatives: ['&#125;']
        },
        ...ruleOptions.noUnescapedEntities?.extraForbiddenCharacters ?? []
      ]
    }
  ],
  'react/no-unknown-property': [
    'error',
    {
      // @ts-expect-error - type definition is not up-to-date
      requireDataLowercase: true,
      ignore: ruleOptions.noUnknownProperty?.ignoredProperties
    }
  ],
  'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
  'react/no-unused-prop-types': 'error',
  'react/prop-types': ['error', { skipUndeclared: false }],
  'react/style-prop-object': ['error', { allow: ruleOptions.stylePropObject?.allowedComponents }],
  'react/void-dom-elements-no-children': 'error'
})


const jsxRules = (ruleOptions: NonNullable<OptionsReact['ruleOptions']>): ConfigItem['rules'] => ({
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-key': [
    'error',
    {
      checkFragmentShorthand: true,
      // Maybe a breaking change in future: https://github.com/facebook/react/issues/20031#issuecomment-710346866
      checkKeyMustBeforeSpread: true,
      warnOnDuplicates: true
    }
  ],
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
  'react/jsx-no-leaked-render': 'warn',
  'react/jsx-no-script-url': [
    'error',
    [
      { name: 'Link', props: ['to', 'href'] },
      ...ruleOptions.jsxNoScriptUrl?.extraComponentNameAndProps ?? []
    ]
  ],
  'react/jsx-no-target-blank': [
    'error',
    {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
      warnOnSpreadAttributes: true,
      links: true,
      forms: true
    }
  ],
  'react/jsx-no-undef': ['error', { allowGlobals: true }],
  'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
  'react/jsx-pascal-case': [
    'error',
    {
      allowAllCaps: false,
      allowLeadingUnderscore: false,
      allowNamespace: false,
      ignore: ruleOptions.jsxPascalCase?.ignore
    }
  ],
  'react/jsx-uses-vars': 'error'
})


const reactTypeScriptRules: ConfigItem['rules'] = {
  'react/no-typos': 'off',
  'react/no-unknown-property': 'off'
}


const jsxTypeScriptRules: ConfigItem['rules'] = {
  'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
  'react/jsx-no-leaked-render': 'off'
}


const reactStylisticRules: ConfigItem['rules'] = {
  'react/self-closing-comp': ['error', { html: true, component: true }]
}


const jsxStylisticRules: ConfigItem['rules'] = {
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  'react/jsx-closing-tag-location': 'error',
  'react/jsx-curly-brace-presence': [
    'error',
    {
      props: 'never',
      children: 'never',
      propElementValues: 'always'
    }
  ],
  'react/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
  'react/jsx-curly-spacing': [
    'error',
    {
      when: 'never',
      children: true,
      allowMultiline: false,
      attributes: true
    }
  ],
  'react/jsx-equals-spacing': ['error', 'never'],
  'react/jsx-first-prop-new-line': ['error', 'multiline'],
  'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-max-props-per-line': ['error', { maximum: { single: 3, multi: 1 } }],
  'react/jsx-sort-props': [
    'error',
    {
      callbacksLast: true,
      shorthandFirst: true,
      shorthandLast: false,
      multiline: 'ignore',
      ignoreCase: true,
      noSortAlphabetically: false,
      reservedFirst: true,
      locale: 'auto'
    }
  ],
  'react/jsx-tag-spacing': [
    'error',
    {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    }
  ],
  'react/jsx-wrap-multilines': [
    'error',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      'return': 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }
  ]
}


const reactHooksRules = (ruleOptions: NonNullable<OptionsReact['ruleOptions']>): ConfigItem['rules'] => ({
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': [
    'warn',
    { additionalHooks: ruleOptions.reactHooksExhaustiveDeps?.additionalHooks }
  ]
})


const jsxAccessibilityRules = ({

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
        ...typescript && jsxTypeScriptRules,
        ...reactStylisticRules,
        ...jsxStylisticRules,
        ...reactHooksRules(ruleOptions),
        ...!!accessibility && jsxAccessibilityRules(accessibility),
        ...overrides,
        ...!!accessibility && overrides?.accessibility
      }
    }
  ]
}
