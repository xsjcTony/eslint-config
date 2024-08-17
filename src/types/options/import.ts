import type { OptionsEnableStylistic, OptionsHasTypeScript, OptionsOverrides } from '.'
import type { TsResolverOptions } from 'eslint-import-resolver-typescript'


export interface OptionsImport extends
  OptionsEnableStylistic,
  OptionsOverrides,
  OptionsHasTypeScript {
  vue?: boolean
  tsResolverOptions?: Pick<TsResolverOptions, 'alwaysTryTypes' | 'project'>
}
