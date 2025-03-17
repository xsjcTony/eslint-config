import type { OptionsTanStackRouter, TypedFlatConfigItem } from '../types'
import { GLOB_TS, GLOB_TSX } from '../globs'
import { ensurePackages, interopDefault } from '../utils'


const tanstackRouterRules: TypedFlatConfigItem['rules'] = {
  'tanstack-router/create-route-property-order': 'error',
}


export async function tanstackRouter(options: OptionsTanStackRouter = {}): Promise<TypedFlatConfigItem[]> {

  const {
    files = [GLOB_TS, GLOB_TSX],
    overrides,
  } = options


  await ensurePackages(['@tanstack/eslint-plugin-router'])


  return [
    {
      name: 'aelita:tanstack-router:setup',
      plugins: {
        'tanstack-router': await interopDefault(import('@tanstack/eslint-plugin-router')),
      },
    },
    {
      name: 'aelita:tanstack-router:rules',
      files,
      rules: tanstackRouterRules,
    },
    ...overrides
      ? [{
        name: 'aelita:tanstack-router:override:custom',
        files,
        rules: overrides,
      }]
      : [],
  ]
}
