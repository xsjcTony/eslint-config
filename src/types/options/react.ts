import type { OptionsFiles, OptionsHasTypeScript, OptionsOverrides } from './misc'
import type { TypedFlatConfigItem } from '../misc'


export interface OptionsReact extends
  OptionsHasTypeScript,
  OptionsFiles,
  OptionsOverrides {
  /**
   * Whether to enable `eslint-plugin-jsx-a11y` rules.
   */
  accessibility?: boolean | JsxAccessibilityOptions

  /**
   * Overrides for `eslint-plugin-vuejs-accessibility` rules.
   */
  a11yOverrides?: TypedFlatConfigItem['rules']

  /**
   * Enable `react-refresh/only-export-components` rule or not.
   *
   * @default true
   */
  enableFastRefresh?: boolean

  /**
   * Whether this is a `Next.js` project
   */
  next?: boolean

  /**
   * React settings
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc-
   */
  settings?: {
    createClass?: string
    pragma?: string
    fragment?: string
    /**
     * @default 'detect'
     */
    version?: string
    flowVersion?: string
  }

  /**
   * Wrapper function on props.
   */
  propWrapperFunctions?: (
    | string
    | { property: string; object?: string }
    | { property: string; exact: true }
  )[]

  /**
   * Wrapper function on component.
   */
  componentWrapperFunctions?: (
    | string
    | { property: string; object?: string }
  )[]

  /**
   * Additional form components.
   */
  formComponents?: (string | { name: string; formAttribute: string })[]

  /**
   * Additional link components.
   */
  linkComponents?: (string | { name: string; linkAttribute: string })[]

  /**
   * Additional image components.
   */
  imageComponents?: string[]

  /**
   * Optional settings for rules.
   */
  ruleOptions?: ReactRuleOptions
}


interface ReactRuleOptions {
  /**
   * For `react/boolean-prop-naming` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
   */
  booleanPropNaming?: {
    extraPropTypeNames?: [string, ...string[]]
  }

  /**
   * For `react/jsx-no-script-url` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
   */
  jsxNoScriptUrl?: {
    extraComponentNameAndProps?: { name: string; props: string[] }[]
  }

  /**
   * For `react/no-unescaped-entities` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
   */
  noUnescapedEntities?: {
    extraForbiddenCharacters?: (string | { 'char': string; alternatives?: string[] })[]
  }

  /**
   * For `react/no-unknown-property` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
   */
  noUnknownProperty?: {
    ignoredProperties?: string[]
  }

  /**
   * For `react/style-prop-object` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
   */
  stylePropObject?: {
    allowedComponents?: string[]
  }


  /**
   * For `react-hooks/exhaustive-deps` rule.
   *
   * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
   */
  reactHooksExhaustiveDeps?: {
    additionalHooks?: string
  }


  /**
   * For `react-refresh/only-export-components` rule.
   *
   * @see https://github.com/ArnaudBarre/eslint-plugin-react-refresh#allowexportnames-v044
   */
  fastRefresh?: {
    allowedExportNames?: string[]
  }
}


interface JsxAccessibilityOptions {
  /**
   * For `jsx-a11y/alt-text` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
   */
  altText?: {
    extraElements?: string[]
    elementMapping?: {
      object?: string[]
      area?: string[]
      'input[type="image"]'?: string[]
      [el: string]: any
    }
  }

  /**
   * For `jsx-a11y/anchor-is-valid` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
   */
  anchorIsValid?: {
    aspects?: [
      'noHref' | 'invalidHref' | 'preferButton',
      ...('noHref' | 'invalidHref' | 'preferButton')[],
    ]
  }

  /**
   * For `jsx-a11y/aria-role` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md
   */
  ariaRole?: {
    allowedInvalidRoles?: string[]
  }

  /**
   * For `jsx-a11y/autocomplete-valid` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md
   */
  autocompleteValid?: {
    extraInputComponents?: string[]
  }

  /**
   * For `jsx-a11y/control-has-associated-label` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md
   */
  controlHasAssociatedLabel?: {
    labelAttributes?: string[]
    controlComponents?: string[]
    ignoreElements?: string[]
    ignoreRoles?: string[]
    depth?: number
  }

  /**
   * For `jsx-a11y/heading-has-content` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md
   */
  headingHasContent?: {
    extraComponents?: string[]
  }

  /**
   * For `jsx-a11y/img-redundant-alt` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md
   */
  imgRedundantAlt?: {
    extraCheckedWords?: string[]
  }

  /**
   * For `jsx-a11y/interactive-supports-focus` rule.
   */
  interactiveSupportsFocus?: {
    extraTabbableElements?: (
      | 'columnheader'
      | 'combobox'
      | 'grid'
      | 'gridcell'
      | 'listbox'
      | 'menu'
      | 'menubar'
      | 'menuitem'
      | 'menuitemcheckbox'
      | 'menuitemradio'
      | 'option'
      | 'progressbar'
      | 'radio'
      | 'radiogroup'
      | 'row'
      | 'rowheader'
      | 'scrollbar'
      | 'slider'
      | 'tab'
      | 'tablist'
      | 'tree'
      | 'treegrid'
      | 'treeitem'
      | 'doc-backlink'
      | 'doc-biblioref'
      | 'doc-glossref'
      | 'doc-noteref'
    )[]
  }

  /**
   * For `jsx-a11y/label-has-associated-control` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
   */
  labelHasAssociatedControl?: {
    extraLabelComponents?: string[]
    labelAttributes?: string[]
    extraControlComponents?: string[]
    assert?: 'htmlFor' | 'nesting' | 'both' | 'either'
    depth?: number
  }

  /**
   * For `jsx-a11y/media-has-caption` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md
   */
  mediaHasCaption?: {
    audio?: string[]
    video?: string[]
    track?: string[]
  }

  /**
   * For `jsx-a11y/no-autofocus` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
   */
  noAutofocus?: boolean

  /**
   * For `jsx-a11y/no-distracting-elements` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md
   */
  noDistractingElements?: {
    extraDistractingElements?: ('blink' | 'marquee')[]
  }

  /**
   * For `jsx-a11y/no-interactive-element-to-noninteractive-role` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
   */
  noInteractiveElementToNoninteractiveRole?: Record<string, string[]>

  /**
   * For `jsx-a11y/no-noninteractive-element-interactions` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
   */
  noNoninteractiveElementInteractions?: {
    extraHandlers?: string[]
  }

  /**
   * For `jsx-a11y/no-noninteractive-element-to-interactive-role` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
   */
  noNoninteractiveElementToInteractiveRole?: Record<string, string[]>

  /**
   * For `jsx-a11y/no-noninteractive-tabindex` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md
   */
  noNoninteractiveTabindex?: {
    tags?: string[]
    extraRoles?: string[]
    allowExpressionValues?: boolean
  }

  /**
   * For `jsx-a11y/no-redundant-roles` rule.
   *
   * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
   */
  noRedundantRoles?: Record<string, string[]>

  /**
   * For `jsx-a11y/no-static-element-interactions` rule.
   */
  noStaticElementInteractions?: {
    extraHandlers?: string[]
    allowExpressionValues?: boolean
  }
}
