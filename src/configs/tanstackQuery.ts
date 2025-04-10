import type { OptionsTanStackQuery, TypedFlatConfigItem } from '../types'
import { GLOB_TS, GLOB_TSX } from '../globs'
import { ensurePackages, interopDefault } from '../utils'


const tanStackQueryRules: TypedFlatConfigItem['rules'] = {
  'tanstack-query/exhaustive-deps': 'warn',
  'tanstack-query/stable-query-client': 'error',
  'tanstack-query/no-rest-destructuring': 'error',
  'tanstack-query/no-unstable-deps': 'error',
  'tanstack-query/infinite-query-property-order': 'error',
  'tanstack-query/no-void-query-fn': 'error',
}


export async function tanstackQuery(options: OptionsTanStackQuery = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files = [GLOB_TS, GLOB_TSX],
    overrides,
  } = options


  await ensurePackages(['@tanstack/eslint-plugin-query'])


  return [
    {
      name: 'aelita:tanstack-query:setup',
      plugins: {
        'tanstack-query': await interopDefault(import('@tanstack/eslint-plugin-query')),
      },
    },
    {
      name: 'aelita:tanstack-query:rules',
      files,
      rules: tanStackQueryRules,
    },
    ...overrides
      ? [{
        name: 'aelita:tanstack-query:override:custom',
        files,
        rules: overrides,
      }]
      : [],
  ]
}
