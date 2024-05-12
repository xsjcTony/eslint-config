import type { OptionsEnableStylistic, OptionsHasTypeScript, OptionsOverrides } from '.'


export interface OptionsImport extends
  OptionsEnableStylistic,
  OptionsOverrides,
  OptionsHasTypeScript {
  vue?: boolean
}
