import { GLOB_JSX, GLOB_SRC, GLOB_TSX } from '../globs'
import { pluginJsxA11y, pluginReact, pluginReactHooks, pluginReactRefresh } from '../plugins'
import type { OptionsConfig, ConfigItem, OptionsReact } from '../types'


interface ReactOptions extends OptionsReact {
  overrides?: {
    react?: NonNullable<OptionsConfig['overrides']>['react']
    jsxA11y?: NonNullable<OptionsConfig['overrides']>['jsxA11y']
  }
}


const reactRules = (ruleOptions: NonNullable<ReactOptions['ruleOptions']>): ConfigItem['rules'] => ({
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


const jsxRules = (ruleOptions: NonNullable<ReactOptions['ruleOptions']>): ConfigItem['rules'] => ({
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


const reactStylisticRules: ConfigItem['rules'] = { 'react/self-closing-comp': ['error', { html: true, component: true }] }


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


const reactHooksRules = (ruleOptions: NonNullable<ReactOptions['ruleOptions']>): ConfigItem['rules'] => ({
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': [
    'warn',
    { additionalHooks: ruleOptions.reactHooksExhaustiveDeps?.additionalHooks }
  ]
})


const jsxAccessibilityRules = ({
  linkComponents,
  imageComponents,
  accessibility = {}
}: ReactOptions): ConfigItem['rules'] => {
  if (!accessibility)
    return {}

  const extraLinkComponents = linkComponents
    ?.map(comp => typeof comp === 'string' ? comp : comp.name)
  const extraLinkComponentAttributes = linkComponents
    ?.filter(comp => typeof comp !== 'string')
    ?.map(comp =>
      (comp as Exclude<NonNullable<ReactOptions['linkComponents']>[number], string>).linkAttribute)

  const {
    altText,
    anchorIsValid,
    ariaRole,
    autocompleteValid,
    controlHasAssociatedLabel,
    headingHasContent,
    imgRedundantAlt,
    interactiveSupportsFocus,
    labelHasAssociatedControl,
    mediaHasCaption,
    noAutofocus,
    noDistractingElements,
    noInteractiveElementToNoninteractiveRole,
    noNoninteractiveElementInteractions,
    noNoninteractiveElementToInteractiveRole,
    noNoninteractiveTabindex,
    noRedundantRoles,
    noStaticElementInteractions
  } = accessibility

  return {
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]', ...altText?.extraElements ?? []],
        img: imageComponents,
        ...altText?.elementMapping
      }
    ],
    'jsx-a11y/anchor-has-content': ['error', { components: extraLinkComponents }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: extraLinkComponents,
        specialLink: extraLinkComponentAttributes,
        aspects: anchorIsValid?.aspects ?? ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': [
      'error',
      {
        allowedInvalidRoles: ariaRole?.allowedInvalidRoles,
        ignoreNonDOM: true
      }
    ],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': ['error', { inputComponents: autocompleteValid?.extraInputComponents }],
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/control-has-associated-label': ['error', { ...controlHasAssociatedLabel }],
    'jsx-a11y/heading-has-content': ['error', { components: headingHasContent?.extraComponents }],
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': [
      'error',
      {
        components: imageComponents,
        words: imgRedundantAlt?.extraCheckedWords
      }
    ],
    'jsx-a11y/interactive-supports-focus': [
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
          ...interactiveSupportsFocus?.extraTabbableElements ?? []
        ]
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      labelHasAssociatedControl ?? {}
    ],
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': ['error', { ...mediaHasCaption }],
    'jsx-a11y/mouse-events-have-key-events': [
      'error',
      {
        hoverInHandlers: [
          'onMouseOver',
          'onMouseEnter',
          'onPointerOver',
          'onPointerEnter'
        ],
        hoverOutHandlers: [
          'onMouseOut',
          'onMouseLeave',
          'onPointerOut',
          'onPointerLeave'
        ]
      }
    ],
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    ...noAutofocus && { 'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }] },
    'jsx-a11y/no-distracting-elements': [
      'error',
      // @ts-expect-error - type definition is incorrect
      { elements: ['marquee', 'blink', ...noDistractingElements?.extraDistractingElements ?? []] }
    ],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
        ...noInteractiveElementToNoninteractiveRole
      }
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
          ...noNoninteractiveElementInteractions?.extraHandlers ?? []
        ]
      }
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        ...noNoninteractiveElementToInteractiveRole
      }
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: noNoninteractiveTabindex?.tags,
        roles: ['tabpanel', ...noNoninteractiveTabindex?.extraRoles ?? []],
        allowExpressionValues: noNoninteractiveTabindex?.allowExpressionValues ?? true
      }
    ],
    'jsx-a11y/no-redundant-roles': ['error', { nav: ['navigation'], ...noRedundantRoles }],
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
          ...noStaticElementInteractions?.extraHandlers ?? []
        ],
        allowExpressionValues: noStaticElementInteractions?.allowExpressionValues ?? true
      }
    ],
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error'
  }
}


export const react = (options: ReactOptions = {}): ConfigItem[] => {
  const {
    files = [GLOB_SRC],
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
      files,
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
        ...!!accessibility && jsxAccessibilityRules(options),
        ...overrides?.react,
        ...!!accessibility && overrides?.jsxA11y
      }
    },
    {
      name: 'aelita:react:fast-refresh',
      files: [GLOB_JSX, GLOB_TSX],
      plugins: {
        'react-refresh': pluginReactRefresh
      },
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          {
            checkJS: false,
            allowConstantExport: true,
            allowExportNames: ruleOptions.fastRefresh?.allowedExportNames
          }
        ]
      }
    }
  ]
}
