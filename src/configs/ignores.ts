import { GLOB_EXCLUDE } from '../globs'
import type { FlatConfigItem } from '../types'


export const ignores = (): FlatConfigItem[] => [{ ignores: GLOB_EXCLUDE }]
