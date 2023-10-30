import type {
  FlatESLintConfigItem,
  MergeIntersection,
  RenamePrefix,
  TypeScriptRules,
  ImportRules,
  EslintRules,
  VueRules,
  ReactRules,
  ReactHooksRules
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
  & RenamePrefix<ReactHooksRules, 'react-hooks/', 'hooks/'>
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

export interface OptionsVue {
  globalComponents?: string[]
}

type LooseJavascriptRulesDict = FlatESLintConfigItem<MergeIntersection<EslintRules>, false>['rules']
type LooseTypescriptRulesDict = FlatESLintConfigItem<
  RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'>,
  false
>['rules']
type LooseReactRulesDict = FlatESLintConfigItem<
  MergeIntersection<ReactRules & RenamePrefix<ReactHooksRules, 'react-hooks/', 'hooks/'>>,
  false
>['rules']
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
  react?: boolean

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
    react?: LooseReactRulesDict
    vue?: LooseVueRulesDict
    import?: LooseImportRulesDict & {
      typescript?: LooseTypescriptRulesDict
    }
  }
}
