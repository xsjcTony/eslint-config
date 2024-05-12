import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsTypeScriptWithTypes,
} from '.'
import type { ParserOptions } from '@typescript-eslint/types'


export interface OptionsTypeScript extends
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsTypeScriptWithTypes {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * Project type.
   *
   * @default 'app'
   */
  projectType?: 'app' | 'lib'
}
