import type { OptionsEnableStylistic, OptionsHasTypeScript, OptionsOverrides } from '.'
import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript'


export interface OptionsImport extends
  OptionsEnableStylistic,
  OptionsOverrides,
  OptionsHasTypeScript {
  vue?: boolean

  tsResolverOptions?: TypeScriptResolverOptions

  /**
   * Optional settings for rules.
   */
  ruleOptions?: ImportRuleOptions
}


interface ImportRuleOptions {
  /**
   * For `import/order` rule.
   *
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
   */
  order?: {
    /**
     * Whether to put `import type` statements at the top.
     *
     * This will be a breaking change in v4, which will remove this flag and enable it by default.
     */
    typeImportsFirst?: boolean
    pathGroups?: {
      pattern: string
      patternOptions?: Record<string, unknown | undefined>
      group: 'builtin' | 'external' | 'internal' | 'unknown' | 'parent' | 'sibling' | 'index' | 'object' | 'type'
      position?: 'after' | 'before'
    }[]
  }
}
