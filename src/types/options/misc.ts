import type { OptionsStylistic, TypedFlatConfigItem } from '..'


export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[]
}


export interface OptionsHasTypeScript {
  typescript?: boolean
}


export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}


export interface OptionsIsInEditor {
  isInEditor?: boolean
}


export interface OptionsTypeScriptWithTypes {
  /**
   * Whether to enable type aware rules.
   * @see https://typescript-eslint.io/linting/typed-linting/
   *
   * @default true
   */
  enableTypeAwareRules?: boolean

  projectService?: {
    allowDefaultProject?: string[]
    defaultProject?: string
  }
}


export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}


export interface OptionsEnableStylistic {
  stylistic?: boolean | OptionsStylistic
}
