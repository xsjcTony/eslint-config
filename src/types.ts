import type {
  FlatESLintConfigItem,
  MergeIntersection,
  RenamePrefix,
  TypeScriptRules,
  ImportRules,
  EslintRules,
  VueRules,
  ReactRules,
  ReactHooksRules,
  JsxA11yRules
} from '@antfu/eslint-define-config'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'


// TODO: implement this
export type Rules = MergeIntersection<
  & RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'>
  & ImportRules
  & EslintRules
  & VueRules
  & ReactRules
  & ReactHooksRules
>


export type ConfigItem = Omit<FlatESLintConfigItem<Rules, false>, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}


export interface OptionsComponentExtensions {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExtensions?: string[]
}

export interface OptionsTypeScriptParserOptionsOverride {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptionsOverride?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}


interface VueAccessibilityOptions {
  /**
   * For `vue-a11y/alt-text` rule.
   *
   * @see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html
   */
  altText?: {
    extraElements?: string[]
    img?: string[]
    object?: string[]
    area?: string[]
    'input[type="image"]'?: string[]
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
    extraTabbableElements?: string[]
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

export interface OptionsVue extends OptionsHasTypeScript {
  /**
   * Whether to enable `eslint-plugin-vuejs-a11y` rules.
   *
   * @default {}
   */
  accessibility?: false | VueAccessibilityOptions

  /**
   * Rule overwrites
   */
  overrides?: NonNullable<OptionsConfig['overrides']>['vue']

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
}


interface JsxAccessibilityOptions {

}

export interface OptionsReact extends OptionsHasTypeScript {
  /**
   * Whether to enable `eslint-plugin-jsx-a11y` rules.
   */
  accessibility?: false | JsxAccessibilityOptions

  /**
   * Rule overwrites
   */
  overrides?: NonNullable<OptionsConfig['overrides']>['react']

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
   * Optional settings for rules.
   */
  ruleOptions?: {
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
     * For `react/jsx-pascal-case` rule.
     *
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
     */
    jsxPascalCase?: {
      ignore?: [string]
    }

    /**
     * For `react/no-unescaped-entities` rule.
     *
     * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
     */
    noUnescapedEntities?: {
      extraForbiddenCharacters?: (string | { char: string; alternatives?: string[] })[]
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
  }
}


type LooseJavascriptRulesDict = FlatESLintConfigItem<MergeIntersection<EslintRules>, false>['rules']
type LooseTypescriptRulesDict = FlatESLintConfigItem<
  RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'>,
  false
>['rules']
type LooseReactRulesDict = FlatESLintConfigItem<
  MergeIntersection<ReactRules & ReactHooksRules>,
  false
>['rules']
type LooseJsxA11yDict = FlatESLintConfigItem<MergeIntersection<JsxA11yRules>, false>['rules']
type LooseVueRulesDict = FlatESLintConfigItem<MergeIntersection<VueRules>, false>['rules']
type LooseImportRulesDict = FlatESLintConfigItem<MergeIntersection<ImportRules>, false>['rules']


export interface OptionsConfig extends OptionsComponentExtensions {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | (OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptionsOverride)

  /**
   * Enable React related rules.
   *
   * @default auto-detect based on the dependencies
   */
  react?: boolean | OptionsReact

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean

  /**
   * Provide overrides for rules for each integration.
   */
  overrides?: {
    javascript?: LooseJavascriptRulesDict
    typescript?: LooseTypescriptRulesDict
    react?: LooseReactRulesDict & {
      accessibility?: LooseJsxA11yDict
    }
    vue?: LooseVueRulesDict & {
      accessibility?: ConfigItem['rules']
    }
    import?: LooseImportRulesDict & {
      typescript?: LooseImportRulesDict
    }
  }
}
