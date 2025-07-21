import type {
  OptionsComponentExts,
  OptionsImport,
  OptionsIsInEditor,
  OptionsJavaScript,
  OptionsNext,
  OptionsNode,
  OptionsOverrides,
  OptionsPlaywright,
  OptionsReact,
  OptionsStylistic,
  OptionsTanStackQuery,
  OptionsTanStackRouter,
  OptionsTypeScript,
  OptionsUnicorn,
  OptionsUnocss,
  OptionsVitest,
  OptionsVue,
} from '.'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'


export interface OptionsConfig extends OptionsComponentExts, OptionsIsInEditor {
  /**
   * Automatically rename plugins in the config.
   *
   * @default true
   */
  autoRenamePlugins?: boolean

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
   * JavaScript options.
   *
   * @default {}
   */
  javascript?: OptionsJavaScript

  /**
   * Unicorn options.
   */
  unicorn?: OptionsUnicorn

  /**
   * Node.js options.
   */
  node?: OptionsNode

  /**
   * Enable TypeScript support.
   */
  typescript?: boolean | OptionsTypeScript

  /**
   * Enable import support.
   *
   * @default true
   */
  'import'?: boolean | OptionsImport

  /**
   * Enable stylistic support.
   *
   * @default true
   */
  // eslint-disable-next-line style/no-extra-parens
  stylistic?: boolean | (
    & OptionsStylistic
    & OptionsOverrides
    & {
      /**
       * For `style/jsx-pascal-case` rule.
       *
       * @see https://eslint.style/rules/jsx/jsx-pascal-case#rule-options
       */
      jsxPascalCaseIgnore?: string[]
    }
  )

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue

  /**
   * Enable React support.
   */
  react?: boolean | OptionsReact

  /**
   * Enable Next.js support.
   */
  next?: boolean | OptionsNext

  /**
   * Enable Playwright support.
   */
  playwright?: boolean | OptionsPlaywright

  /**
   * Enable UnoCSS support.
   */
  unocss?: boolean | OptionsUnocss

  /**
   * Enable Vitest support.
   */
  vitest?: boolean | OptionsVitest

  /**
   * Enable TanStack Query support.
   */
  tanstackQuery?: boolean | OptionsTanStackQuery

  /**
   * Enable TanStack Router support.
   */
  tanstackRouter?: boolean | OptionsTanStackRouter
}
