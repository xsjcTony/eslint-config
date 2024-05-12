import type { OptionsFiles, OptionsIsInEditor, OptionsOverrides } from './misc'


export interface OptionsVitest extends OptionsFiles, OptionsOverrides, OptionsIsInEditor {
  /**
   * Enable type testing support.
   *
   * @default false
   */
  typeCheck?: boolean
}
