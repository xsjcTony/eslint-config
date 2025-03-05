import type { OptionsEnableStylistic, OptionsFiles, OptionsHasTypeScript, OptionsOverrides } from '.'
import type { TypedFlatConfigItem } from '..'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'


export interface OptionsVue extends
  OptionsFiles,
  OptionsHasTypeScript,
  OptionsOverrides,
  OptionsEnableStylistic {
  /**
   * Whether to include globals for node.
   *
   * @see https://eslint.vuejs.org/user-guide/#specifying-globals-eslint-config-js
   * @default false
   */
  ssr?: boolean

  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions

  /**
   * Whether to enable `eslint-plugin-vuejs-accessibility` rules.
   *
   * @default {}
   */
  accessibility?: boolean | VueAccessibilityOptions

  /**
   * Global component names, array of `string` only.
   */
  globalComponents?: string[]

  /**
   * Extra global component names, array of `RegExp`.
   *
   * This will be combined with `globalComponents`.
   */
  extraGlobalComponentsWithRegex?: string[]

  /**
   * Optional settings for rules.
   */
  ruleOptions?: VueRuleOptions

  /**
   * Overrides for `eslint-plugin-vuejs-accessibility` rules.
   */
  a11yOverrides?: TypedFlatConfigItem['rules']
}


interface VueRuleOptions {
  /**
   * For `vue/multi-word-component-names` rule.
   *
   * @see https://eslint.vuejs.org/rules/multi-word-component-names.html
   */
  multiWordComponentNames?: {
    ignores?: string[]
  }
}


interface VueAccessibilityOptions {
  /**
   * For `vue-a11y/alt-text` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html
   */
  altText?: {
    extraElements?: string[]
    elementMapping?: {
      img?: string[]
      object?: string[]
      area?: string[]
      'input[type="image"]'?: string[]
      [el: string]: any
    }
  }

  /**
   * For `vue-a11y/anchor-has-content` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/anchor-has-content.html
   */
  anchorHasContent?: {
    extraComponents?: string[]
    accessibleChildren?: string[]
    accessibleDirectives?: string[]
  }

  /**
   * For `vue-a11y/form-control-has-label` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/form-control-has-label.html
   */
  formControlHasLabel?: {
    extraLabelComponents?: string[]
    extraControlComponents?: string[]
  }

  /**
   * For `vue-a11y/heading-has-content` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/heading-has-content.html
   */
  headingHasContent?: {
    extraComponents?: string[]
    accessibleChildren?: string[]
    accessibleDirectives?: string[]
  }

  /**
   * For `vue-a11y/interactive-supports-focus` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/interactive-supports-focus.html
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
   * For `vue-a11y/label-has-for` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/label-has-for.html
   */
  labelHasFor?: {
    extraComponents?: string[]
    extraControlComponents?: string[]
    required?: 'nesting' | 'id' | { some: ('nesting' | 'id')[] } | { every: ('nesting' | 'id')[] }
    allowChildren?: boolean
  }

  /**
   * For `vue-a11y/media-has-caption` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/media-has-caption.html
   */
  mediaHasCaption?: {
    audio?: string[]
    video?: string[]
    track?: string[]
  }

  /**
   * For `vue-a11y/no-autofocus` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-autofocus.html
   */
  noAutofocus?: boolean

  /**
   * For `vue-a11y/no-distracting-elements` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-distracting-elements.html
   */
  noDistractingElements?: {
    extraDistractingElements?: string[]
  }

  /**
   * For `vue-a11y/no-redundant-roles` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/no-redundant-roles.html
   */
  noRedundantRoles?: {
    extraExceptions?: Record<string, string[]>
  }
}
