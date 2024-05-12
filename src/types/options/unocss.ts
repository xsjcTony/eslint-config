import type { OptionsFiles, OptionsOverrides } from './misc'


export interface OptionsUnocss extends OptionsFiles, OptionsOverrides {
  /**
   * Enable attributify mode.
   *
   * @default false
   */
  attributify?: boolean
}
