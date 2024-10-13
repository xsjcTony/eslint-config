import { fixupPluginRules } from '@eslint/compat'
import { GLOB_JSX, GLOB_SRC, GLOB_TSX } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type { OptionsReact, TypedFlatConfigItem } from '../types'


function reactRules(options: OptionsReact = {}): TypedFlatConfigItem['rules'] {
  const {
    typescript,
    ruleOptions = {},
  } = options

  return {
    'react/boolean-prop-naming': typescript
      ? 'off'
      : [
        'warn',
        {
          rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          message: 'BOOLEAN prop ({{ propName }}) should start with "is" or "has" and use camelCase',
          validateNested: false,
          propTypeNames: ruleOptions.booleanPropNaming?.extraPropTypeNames,
        },
      ],
    'react/button-has-type': ['error', { button: true, submit: true, reset: true }],
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
    'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
    'react/display-name': ['error', { ignoreTranspilerName: false, checkContextObjects: false }],
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
            alternatives: ['&gt;'],
          },
          {
            'char': '"',
            alternatives: ['&quot;'],
          },
          {
            'char': '\'',
            alternatives: ['&apos;'],
          },
          {
            'char': '}',
            alternatives: ['&#125;'],
          },
          ...ruleOptions.noUnescapedEntities?.extraForbiddenCharacters ?? [],
        ],
      },
    ],
    'react/no-unknown-property': [
      'error',
      {
        requireDataLowercase: true,
        ignore: ruleOptions.noUnknownProperty?.ignoredProperties,
      },
    ],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/no-unused-prop-types': 'error',

    'react/prop-types': ['error', { skipUndeclared: false }],
    'react/style-prop-object': ['error', { allow: ruleOptions.stylePropObject?.allowedComponents }],
    'react/void-dom-elements-no-children': 'error',
  }
}


function jsxRules(options: NonNullable<OptionsReact['ruleOptions']>): TypedFlatConfigItem['rules'] {
  return {
    'react/jsx-boolean-value': ['error', 'never', { assumeUndefinedIsFalse: false }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        // Maybe a breaking change in future: https://github.com/facebook/react/issues/20031#issuecomment-710346866
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-no-leaked-render': 'warn',
    'react/jsx-no-script-url': [
      'error',
      [
        { name: 'Link', props: ['to', 'href'] },
        ...options.jsxNoScriptUrl?.extraComponentNameAndProps ?? [],
      ],
    ],
    'react/jsx-no-target-blank': [
      'error',
      {
        allowReferrer: false,
        enforceDynamicLinks: 'always',
        warnOnSpreadAttributes: true,
        links: true,
        forms: true,
      },
    ],
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-uses-vars': 'error',
    'react/jsx-props-no-spread-multi': 'error',
  }
}


const reactTypeScriptRules: TypedFlatConfigItem['rules'] = {
  'react/no-typos': 'off',
  'react/no-unknown-property': 'off',
}


const jsxTypeScriptRules: TypedFlatConfigItem['rules'] = {
  'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
  'react/jsx-no-leaked-render': 'off',
}


function reactHooksRules(options: NonNullable<OptionsReact['ruleOptions']>): TypedFlatConfigItem['rules'] {
  return {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: options.reactHooksExhaustiveDeps?.additionalHooks },
    ],
  }
}


function jsxAccessibilityRules(options: OptionsReact): TypedFlatConfigItem['rules'] {
  const {
    linkComponents,
    imageComponents,
  } = options

  const accessibility = options.accessibility === false
    ? false
    : typeof options.accessibility === 'boolean'
      ? {}
      : options.accessibility ?? {}

  if (!accessibility)
    return {}

  const extraLinkComponents = linkComponents
    ?.map(comp => typeof comp === 'string' ? comp : comp.name)
  const extraLinkComponentAttributes = linkComponents
    ?.filter(comp => typeof comp !== 'string')
    .map(comp => comp.linkAttribute)

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
    noStaticElementInteractions,
  } = accessibility

  return {
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]', ...altText?.extraElements ?? []],
        img: imageComponents,
        ...altText?.elementMapping,
      },
    ],
    'jsx-a11y/anchor-has-content': ['error', { components: extraLinkComponents }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: extraLinkComponents,
        specialLink: extraLinkComponentAttributes,
        aspects: anchorIsValid?.aspects ?? ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': [
      'error',
      {
        allowedInvalidRoles: ariaRole?.allowedInvalidRoles,
        ignoreNonDOM: true,
      },
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
        words: imgRedundantAlt?.extraCheckedWords,
      },
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
          ...interactiveSupportsFocus?.extraTabbableElements ?? [],
        ],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      labelHasAssociatedControl ?? {},
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
          'onPointerEnter',
        ],
        hoverOutHandlers: [
          'onMouseOut',
          'onMouseLeave',
          'onPointerOut',
          'onPointerLeave',
        ],
      },
    ],
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    ...noAutofocus && { 'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }] },
    'jsx-a11y/no-distracting-elements': [
      'error',
      { elements: ['marquee', 'blink', ...noDistractingElements?.extraDistractingElements ?? []] },
    ],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
        ...noInteractiveElementToNoninteractiveRole,
      },
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
          ...noNoninteractiveElementInteractions?.extraHandlers ?? [],
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        ...noNoninteractiveElementToInteractiveRole,
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: noNoninteractiveTabindex?.tags,
        roles: ['tabpanel', ...noNoninteractiveTabindex?.extraRoles ?? []],
        allowExpressionValues: noNoninteractiveTabindex?.allowExpressionValues ?? true,
      },
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
          ...noStaticElementInteractions?.extraHandlers ?? [],
        ],
        allowExpressionValues: noStaticElementInteractions?.allowExpressionValues ?? true,
      },
    ],
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
  }
}


function reactRefreshRules(options: NonNullable<OptionsReact['ruleOptions']>): TypedFlatConfigItem['rules'] {
  return {
    'react-refresh/only-export-components': [
      'warn',
      {
        checkJS: false,
        allowConstantExport: true,
        allowExportNames: options.fastRefresh?.allowedExportNames,
      },
    ],
  }
}


export async function react(options: OptionsReact = {}): Promise<TypedFlatConfigItem[]> {

  const {
    typescript = false,
    enableFastRefresh = true,
    ruleOptions = {},
    accessibility = {},
    overrides = {},
    a11yOverrides = {},
  } = options


  await ensurePackages([
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    ...enableFastRefresh ? ['eslint-plugin-react-refresh'] : [],
    ...accessibility ? ['eslint-plugin-jsx-a11y'] : [],
  ])


  const [pluginReact, pluginReactHooks] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    // @ts-expect-error - no dts file available
    interopDefault(import('eslint-plugin-react-hooks')),
  ] as const)


  return [
    {
      name: 'aelita:react:setup',
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        ...accessibility && {
          // @ts-expect-error - no dts file available
          'jsx-a11y': fixupPluginRules(await interopDefault(import('eslint-plugin-jsx-a11y'))),
        },
        ...enableFastRefresh && {
          // @ts-expect-error - no dts file available
          'react-refresh': await interopDefault(import('eslint-plugin-react-refresh')),
        },
      },
    },
    {
      name: 'aelita:react:rules',
      files: options.files ?? [GLOB_SRC],
      settings: {
        react: {
          version: 'detect',
          ...options.settings,
        },
        propWrapperFunctions: options.propWrapperFunctions,
        componentWrapperFunctions: options.componentWrapperFunctions,
        formComponents: options.formComponents,
        linkComponents: options.linkComponents,
      },
      rules: {
        ...reactRules(options),
        ...jsxRules(ruleOptions),
        ...typescript && reactTypeScriptRules,
        ...typescript && jsxTypeScriptRules,
        ...reactHooksRules(ruleOptions),
        ...overrides,
      },
    },
    ...accessibility
      ? [{
        name: 'aelita:react:rules:accessibility',
        files: options.files ?? [GLOB_JSX, GLOB_TSX],
        rules: {
          ...jsxAccessibilityRules(options),
          ...a11yOverrides,
        },
      }]
      : [],
    ...enableFastRefresh
      ? [{
        name: 'aelita:react:rules:fast-refresh',
        files: options.files ?? [GLOB_JSX, GLOB_TSX],
        rules: reactRefreshRules(ruleOptions),
      }]
      : [],
  ]
}
